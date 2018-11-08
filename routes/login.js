var express = require("express")
var router = express.Router()

router.get("/", function (req, res) {
	res.render('login', {
		url: '/css/user.css'
	})
})

module.exports = router