var express = require('express')
var app =  express()
var mongoose = require('mongoose')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const MongoStore = require('connect-mongo')(session)

var port = process.env.PORT || 5000

const dbUrl = 'mongodb://localhost:27017/moviesDB'
// 链接数据库
mongoose.connect(dbUrl,{useNewUrlParser:true}, (err) => {
	if (err){
		console.log(err)
	} else {
		console.log('Connetc Successed')
	}
})
app.set('views', './views/pages')
app.set('view engine', 'jade')
app.set('trust proxy', 1) 
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	secret: 'userinfo', 
	cookie: {maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ // 利用mongodb实现session持久化
		url: dbUrl,
		collection: 'sessions'
	})
}));
require('./config/routes')(app)
app.listen(port)

console.log('server run in port:' + port)