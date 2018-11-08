var express = require('express')
var app =  express()
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 5000
var login = require('./routes/login')
var register = require('./routes/register')
var list = require('./routes/list')

var userAction = require('./controller/user')

// 链接数据库
mongoose.connect('mongodb://localhost:27017/moviesDB',{useNewUrlParser:true}, (err) => {
	if (err){
		console.log(err)
	} else {
		console.log('Connetc Successed')
	}
})
app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.listen(port)

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

app.get('/register', register)

//登录方法
app.post('/login', userAction.login)

app.post('/register', userAction.register)

console.log('server run in port:' + port)