// validation lib
//
const Validator = function() {}

Validator.prototype.isEmail = function(t) { return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t) }
Validator.prototype.isEmpty = function (t) { return t.length === 0 }
Validator.prototype.isSize = function(t,min,max=Math.Infinity) { return (t.length >= min) && (t.length < max) }
Validator.prototype.hasAlpha = function(t) { return /[a-zA-Z]/.test(t) }
Validator.prototype.hasNum = function(t) { return /[0-9]/.test(t) }
Validator.prototype.hasSpecial = function(t) { return /[^0-9a-zA-Z]/ }

module.exports = new Validator()
