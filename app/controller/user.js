const userModel = require('../models/userInfo');
const bcrypt = require('bcrypt')
const saltRounds = 10;
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
	userModel.searchOne(reqBody.username,(err, userData) => {
		if (!userData) {
			res.json({
				code: 500,
				msg: '用户名密码错误'
			});
		} else {
			const pwdMatchFlag = bcrypt.compareSync(reqBody.password, userData.password);
			if(err){
				res.json({
					code: 500,
					msg: err
				});
			}
			if (!pwdMatchFlag) {
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
		}	
		
	});
}
// 退出
module.exports.logout = function (req,res) {
	delete req.session.user
	res.redirect('/')
}
module.exports.isLoginRequired = function (req,res,next) {
	if (!req.session.user) {
		return res.redirect('/')
	}
	next()
}
// 注册
module.exports.register = function (req, res) {
	const reqBody = req.body;
	let password = reqBody.password
	 //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds);
    //获取hash值
    var hashPassword = bcrypt.hashSync(password, salt);
	var userData = new userModel({
		userName: reqBody.username,
		password: hashPassword
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