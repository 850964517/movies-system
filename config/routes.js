
var movie = require('../app/controller/movie');
var user = require('../app/controller/user');

module.exports = (app) => {
	// 设置跨域访问
	app.all('*', (req,res,next) => {
		res.header('Access-Control-Allow-Origin','*');
		res.header('Access-Control-Allow-Headers','X-Requested-With');
		res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
		res.header('X-Powered-By','node/express');
		next(); // 执行next方法,将路由转移
	});
	//登录路由
	app.get('/', user.showSignin);
	//注册路由
	app.get('/register', user.showSignup);
	// 电影列表页
	app.get('/movie/list',user.isLoginRequired, movie.list);
	// 修改电影
	app.get('/movie/update/:id',user.isLoginRequired, movie.updateMovie);
	app.get('/movie/add', user.isLoginRequired, movie.addMovie);

	// //登录方法
	app.post('/login', user.login);
	// 退出
	app.get('/logout', user.logout);
	// 注册方法
	app.post('/register', user.register);
	//删除电影
	app.delete('/movie/list',user.isLoginRequired, movie.delMovie);
	// 修改电影
	app.put('/movie/list',user.isLoginRequired,movie.save);
	// 新增电影
	app.post('/movie/list',user.isLoginRequired,movie.save);

	app.get('/movie/search', user.isLoginRequired,movie.search);
};