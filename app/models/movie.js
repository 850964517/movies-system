const mongoose = require('mongoose')
const movieSchemas = require('../schemas/movie')

const movieModel = mongoose.model('movie', movieSchemas,'moviesInfo')

module.exports = movieModel