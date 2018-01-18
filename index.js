import express from 'express'

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
import jwt from 'jsonwebtoken'
import passportJWT from 'passport-jwt'

// configure SSL
const privateKey = fs.readFileSync('./cert/dev.localhost.key')
const certificate = fs.readFileSync('./cert/dev.localhost.crt')

var credentials = {key: privateKey, cert: certificate}

// local configs
import config from './config'

let RedisStore = connectRedis(session)

const app = express()

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

