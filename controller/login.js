const userModel = require('../models/userInfo')
const loginAction = {
	login: function (req,res) {
		const reqBody = req.body
		userModel.login(reqBody.username, reqBody.password, (err, userData) => {
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
	}
}
module.exports = loginAction