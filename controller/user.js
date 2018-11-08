const userModel = require('../models/userInfo')
const userAction = {
	login: function (req,res) {
		const reqBody = req.body
		userModel.searchOne(reqBody.username, reqBody.password, (err, userData) => {
			if(err){
				res.json({
					code: 500,
					msg: err
				})
			}
			if (!userData) {
				res.json({
					code: 500,
					msg: '用户名密码错误'
				})
			} else{
				res.json({
					code: 200,
					msg: '登录成功'
				})
			}
		})
	},
	register (req,res) {
		const reqBody = req.body
		var userData = new userModel({
			userName: reqBody.username,
			password: reqBody.password
		})
		userData.save((err, userData) => {
			if (err) {
				res.json({
					code: 500,
					msg: err
				})
			} else  {
				res.json({
					code: 200,
					msg: '注册成功'
				})
			}
		})
	}
}
module.exports = userAction