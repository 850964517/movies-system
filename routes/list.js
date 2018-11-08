var express = require("express")
var router = express.Router()

router.get("/list", function (req, res) {
	res.render('list', {
		title: '电影列表页',
		url: '/css/user.css'
	})
})

module.exports = router