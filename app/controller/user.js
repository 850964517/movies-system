const userModel = require('../models/userInfo');

// 登录路由
module.exports.showSignin = function (req, res) {
	res.render('login', {
		url: '/css/user.css'
	})
}
// 注册路由
module.exports.showSignup = function (req, res) {
	res.render('register', {
		url: '/css/user.css'
	})
}
// 登录方法
module.exports.login = function (req,res) {
	const reqBody = req.body;
	userModel.searchOne(reqBody.username, reqBody.password, (err, userData) => {
		if(err){
			res.json({
				code: 500,
				msg: err
			});
		}
		if (!userData) {
			res.json({
				code: 500,
				msg: '用户名密码错误'
			});
		} else{
			req.session.user = userData;
			res.json({
				code: 200,
				msg: '登录成功'
			});
		}
	});
}
// 注册
module.exports.register = function (req, res) {
	const reqBody = req.body;
	var userData = new userModel({
		userName: reqBody.username,
		password: reqBody.password
	});
	userData.save((err) => {
		if (err) {
			res.json({
				code: 500,
				msg: err
			});
		} else  {
			res.json({
				code: 200,
				msg: '注册成功'
			});
		}
	});
}