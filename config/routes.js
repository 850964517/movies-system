var login = require('../routes/login')
var register = require('../routes/register')
var list = require('../routes/list')
var userAction = require('../controller/user')

module.exports = (app) => {
	// 设置跨域访问
	app.all("*", (req,res,next) => {
		res.header("Access-Control-Allow-Origin","*")
		res.header("Access-Control-Allow-Headers","X-Requested-With")
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
		res.header("X-Powered-By","node/express")
		next() // 执行next方法,将路由转移
	})
	//登录路由
	app.get('/', login)
	// 电影列表页
	app.get('/list', list)
	// 注册路由
	app.get('/register', register)

	//登录方法
	app.post('/login', userAction.login)
	// 注册方法
	app.post('/register', userAction.register)
}