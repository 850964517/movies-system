const movieModel = require('../models/movie');
// 电影列表
module.exports.list = function (req,res) {
	movieModel.fetch((err,movieData) => {
		res.render('list', {
			url: '/css/page.css',
			user: req.session.user,
			movies: movieData
		})
	}, err => {
		console.log(err)
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
	}, err => {
		console.log(err)
	})
}	

// 修改电影
module.exports.updateMovie = function (req,res) {
	const id = req.params.id
	if (!id) return
	movieModel.findById(id,(err, movieData) => {
		if (err) {
			return new Error(err)
		}
		res.render('update',{
			url: '/css/page.css',
			user: req.session.user,
			movie: movieData
		})
	}, err => {
		console.log(err)
	})
}

// 执行修改电影
module.exports.execUpdateMovie = function (req,res) {
	const reqBody = req.body
	const id = reqBody.id
	movieModel.updateOne({ _id : id},{
		name: reqBody.name,
		title: reqBody.title,
		doctor: reqBody.doctor,
		year: reqBody.year,
		updateTime: reqBody.updateTime,
		country: reqBody.country
	}, (err, data) => {
		if (err) {
			res.json({
				code: 500,
				msg: err
			})
		}else {
			res.json({
				code: 200,
				msg: '修改成功'
			})
		}
	})
}