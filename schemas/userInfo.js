var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
	userName: String,
	password: String
})

userSchema.statics = {
	searchOne: function (userName,password,callback) {
		return this.findOne({
			userName: userName,
			password: password
		}).exec(callback)
	}
}

module.exports = userSchema