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
	  poster: String,
	  year: String
});

MovieSchema.statics = {
	fetch: function (cb) {
		return this.find({}).exec(cb)
	}
}

module.exports = MovieSchema