const mongoose = require('mongoose')
var MovieSchema = new mongoose.Schema({
		doctor: String,
	  title: String,
	  name: String,
	  updateTime: String,
	  language: String,
	  country: String,
	  summary: String,
	  flash: String,
	  flash: String,
	  year: String
});

MovieSchema.statics = {
	fetch: function (cb) {
		return this.find({}).exec(cb)
	},
	findById: function (id,cb) {
		return this.findOne({_id: id}).exec(cb)
	},
	search: function(name,cb) {
		console.log(name)
		if (!name) {
			return this.find({}).exec(cb)
		}
		return this.find({name: new RegExp(name+'.*','i')}).exec(cb)
	}
}

module.exports = MovieSchema