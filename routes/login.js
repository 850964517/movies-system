var express = require("express")
var router = express.Router()

router.get("/", function (req, res) {
	res.render('login', {
		url: '/css/login.css'
	})
})

module.exports = router