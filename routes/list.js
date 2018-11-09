var express = require("express")
var router = express.Router()

router.get("/list", function (req, res) {
	if (!req.session.user) {
		return res.redirect('/')
	}
	res.render('list', {
		title: '电影列表页',
		url: '/css/user.css'
	})
})

module.exports = router