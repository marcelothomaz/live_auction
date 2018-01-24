import express from 'express'
import bodyParser from 'body-parser'
// session stuffs
import session from 'express-session'
import connectRedis from 'connect-redis'
import WebSocket from 'ws'

// server stuffs
import https from 'https'
import url from 'url'
import fs from 'fs'
import path from 'path'

// Auth stuffs
import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import mongoose from 'mongoose'
import promise from 'bluebird'

mongoose.Promise = promise

// configure SSL
const privateKey = fs.readFileSync('./cert/dev.localhost.key')
const certificate = fs.readFileSync('./cert/dev.localhost.crt')

var credentials = {key: privateKey, cert: certificate}

// local configs
import config from './config'
import User from './models/user'
import validator from './lib/validator'

const RedisStore = connectRedis(session)

const app = express()

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false  }));
app.use(bodyParser.json());

// Passport stuffs
mongoose.connect(config.MONGODB, (err, db) => {
   if (err) {
      console.error('Unable to connect to MongoDB. Error: ', err)
   } else {
      console.log('Connected to MongoDB')
   }
})

const strategy = new JwtStrategy({
   jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('JWT'),
   secretOrKey : config.JWT_SECRET
}, function(jwt_payload, next) {
   var user = User.findOne({_id: jwt_payload.id})
   if (user) {
      next(null, user)
   } else {
      next(null, false)
   }
})

passport.use(strategy)
app.use(passport.initialize())

// serve static files
app.use(express.static(path.join(__dirname, 'client/static')))

// session config with redis store
var session_options = {
   store: new RedisStore(),
   secret: config.SESSION_SECRET,
   resave: false,
   saveUninitialized: false,
   cookie: {
      maxAge: 3600000*24*7 // one week
   }
}

// force secure cookie if in production
if (app.get('env') === 'production') {
   app.set('trust proxy', 1) // trust first proxy
   session_options.cookie.secure = true // serve secure cookies
}

// setup session
app.use(session(session_options))

// create HTTPS server
const httpsServer = https.createServer(credentials, app);


// we listen on port 8443, only SSL
httpsServer.listen(8443, err => {
   if (err) {
      return console.error(err)
   }
   console.log('INFO: Server listening on port 8443')
})

// Handle login
app.post('/login', (req,res) => {
   const { email, password } = req.body

   if (!email || !password) {
      res.status(400).send({ok:false, msg:'Please input username and password'})
   } else {


      const user = User.findOne({email}, (err, user) => {
         if (err) throw err;

         if (!user) {
            res.status(401).send({ok:false, msg: 'Authentication failed. Check username and password!'})
         } else {
            user.comparePassword(password, function(err, isMatch) {
               if (isMatch && !err) {
                  let token = jwt.sign({
                     id: user._id,
                     exp: Math.floor(new Date().getTime()/1000) + 7*24*60*60
                  }, config.JWT_SECRET)
                  res.json({ok:true, token: 'JWT ' + token, name: user.name})
               } else {
                  res.status(401).send({ok:false, msg: 'Authentication failed. Check username and password!'})
               }
            })
         }
      })
   }
})

app.post('/api/users',(req, res, next) => {
   const { name, email, password } = req.body

   if (!validator.isEmail(email) 
      || validator.isEmpty(name) 
      || !validator.hasAlpha(password) 
      || !validator.hasSpecial(password) 
      || !validator.isSize(password,8,16) 
      || !validator.hasNum(password)) 
   {
      res.status(400).json({ok: false, message: 'Please check your input data!'})
   } else {
      var user = new User({
         name, email, password 
      })

      user.save(err => {
         if (err) {
            console.error("Error creating user: " + err)
            return res.status(400).json({ok: false, msg: 'Error creating user!'})
         }
         res.status(201).json({ok:true, msg: 'User created successfully!'})
      })
   }
})

app.all('/*', (req,res) => {
   res.sendFile(path.join(__dirname,'./client/static/index.html'))
})
