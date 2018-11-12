// 电影列表
module.exports.list = function (req,res) {
	if (!req.session.user) {
		return res.redirect('/')
	}
	res.render('list', {
		title: '电影列表页',
		url: '/css/user.css'
	})
}