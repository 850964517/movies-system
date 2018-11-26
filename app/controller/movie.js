const movieModel = require('../models/movie');
const tableRowCount = 10
// 电影列表
module.exports.list = function (req,res) {
	let page = +(req.query.page) || 0
	page = page === 0 ? 1 : page
	const startIndex = (page - 1) * tableRowCount 
	const endIndex = page * tableRowCount
	movieModel.fetch((err,movieData) => {
		res.render('list', {
			url: '/css/page.css',
			user: req.session.user,
			movies: movieData.slice(startIndex,endIndex),
			total: movieData.length
		})
	}, err => {
		console.log(err)
	})
}
// 删除电影
module.exports.delMovie = function (req,res) {
	const id = req.query.id
	movieModel.deleteOne({_id:id}, (err) => {
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

module.exports.addMovie = function (req,res) {
	res.render('movieAdd', {
		url: '/css/page.css'
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
module.exports.save = function (req,res) {
	const reqBody = req.body
	const id = reqBody.id
	if (id) {
		movieModel.updateOne({ _id : id},reqBody, (err, data) => {
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
	} else {
		const movieData = new movieModel(reqBody)
		movieData.save((err, data) => {
			if (err) {
				res.json({
					code: 500,
					msg: err
				})
			}else {
				res.json({
					code: 200,
					msg: '添加成功'
				})
			}
		})
	}
}
// 搜索电影
module.exports.search = function (req, res) {
	let page = +(req.query.page) || 0
	page = page === 0 ? 1 : page
	const startIndex = (page - 1) * tableRowCount 
	const endIndex = page * tableRowCount
	movieModel.search(req.query.name , (err, movies) => {
		if (err) {
			res.json({
				code: 500,
				msg: err
			})
		}
		res.json({
			code: 200,
			data: movies.slice(startIndex,endIndex),
			total: movies.length
		})
	}, err => {
		console.log(err)
	})

}