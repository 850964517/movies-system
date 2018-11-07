var express = require('express')
var app =  express()
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var port = process.env.PORT || 5000
var login = require('./routes/login')
var list = require('./routes/list')

var loginAction = require('./controller/login')

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

// // 设置跨域访问
// app.all("*", (req,res,next) => {
// 	res.header("Access-Control-Allow-Origin","*")
// })
//登录路由
app.get('/', login)
// 电影列表页
app.get('/list', list)

//登录方法
app.post('/login', loginAction.login)

console.log('server run in port:' + port)