const mongoose = require('mongoose')
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

var UserSchema = new Schema({
   email: String,
   name: String,
   password: String
})

UserSchema.pre('save', function (next) {
   var user = this;
   if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
         if (err) {
            console.error("Error salting: " + err)
            return next(err);
         }
         bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
               console.error("Error hashing " + err)
               return next(err);
            }
            user.password = hash;
            next();
         });
      });
   } else {
      return next();
   }
});

UserSchema.methods.comparePassword = function (passw, cb) {
   bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
         return cb(err);
      }
      cb(null, isMatch);
   });
};


module.exports = mongoose.model('User', UserSchema);
