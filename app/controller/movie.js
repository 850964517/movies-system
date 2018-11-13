// 电影列表
module.exports.list = function (req,res) {
	res.render('list', {
		url: '/css/user.css',
		user: req.session.user
	})
}