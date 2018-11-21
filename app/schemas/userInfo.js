var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	userName: String,
	password: String
});

userSchema.statics = {
	searchOne: function (userName,callback) {
		return this.findOne({
			userName: userName
		}).exec(callback);
	}
};
// schemas 可以用个add方法添加额外的key值
userSchema.add({
	age: Number
})
module.exports = userSchema;