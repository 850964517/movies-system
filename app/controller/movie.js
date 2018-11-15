const movieModel = require('../models/movie');
// 电影列表
module.exports.list = function (req,res) {
	movieModel.fetch((err,movieData) => {
		res.render('list', {
			url: '/css/page.css',
			user: req.session.user,
			movies: movieData
		})
	})
}
// 删除电影
module.exports.delMovie = function (req,res) {
	const id = req.query.id
	movieModel.remove({_id:id}, (err) => {
		if (err){
			res.json({
				code: 500,
				msg: err
			})
		} else {
			res.json({
				code: 200,
				msg: '删除成功'
			})
		}
	})
}	

// 修改电影

module.exports.updateMovie = function (req,res) {
	console.log("dd")
	res.render('update',{
		url: '/css/page.css',
		user: req.session.user
	})
}