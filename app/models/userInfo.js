var mongoose = require('mongoose')
var userSchemas = require('../schemas/userInfo')

var userModel = mongoose.model('user', userSchemas, 'userInfo')

module.exports = userModel