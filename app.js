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

if ('development' === app.get('env')) {
	app.set('showStackError', true) // 显示错误信息
	app.locals.pretty = true // 开发模式不压缩html
}
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.set('trust proxy', 1) 
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	secret: 'userinfo',  // session 名字
	cookie: {maxAge: 8000000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
	resave: false, // 是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
	saveUninitialized: true, // 是否设置session在存储容器中可以给修改，session过期30分钟，没有人操作时候session 30分钟后过期
	store: new MongoStore({ // 利用mongodb实现session持久化
		url: dbUrl,
		collection: 'sessions' // mongodb中的表名
	})
}))

require('./config/routes')(app)
app.listen(port)

console.log('server run in port:' + port)