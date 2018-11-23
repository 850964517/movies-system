const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Key = webdriver.Key;
const fs = require('fs')    

// !async function () {
// 	const driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();
//   // 打开项目地址
//   await driver.get('http://localhost:5000/');
//   console.log('浏览器已经打开')
// 	await driver.findElement(By.id('username')).sendKeys('Anle');
// 	await driver.findElement(By.id('password')).sendKeys('anle123');
// 	driver.findElement(By.id('login-btn')).click()
// }()

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

const openPage = async function (targetPage) {
	console.log(`正在验证"${targetPage.name}": ${targetPage.url}`)
  await driver.get(targetPage.url)
}

const main = async function() {
	const targetPage = { name: '电影管理系统', url: `http://localhost:5000` }
	openPage(targetPage)
}
// 测试用户
const testUser = {
	username: 'pangpang',
	password: 'pangpang123'
}
// 开始方法
const start = async function () {
	//注册
	driver.get('http://localhost:5000/register')
	await driver.findElement(By.id('username')).sendKeys(testUser.username)
	await driver.findElement(By.id('password')).sendKeys(testUser.password)
	await driver.findElement(By.id('res-password')).sendKeys(testUser.password)
	await driver.findElement(By.id('register-btn')).click()
	await	login()
	await addMovie()
	await delMovie()
	// await updateMovie()
}
// 登录
const login = async function () {
	driver.get('http://localhost:5000')
	await driver.findElement(By.id('username')).sendKeys(testUser.username)
	await driver.findElement(By.id('password')).sendKeys(testUser.password, Key.ENTER)
	await driver.findElement(By.id('login-btn')).click()
}
// 添加电影
async function addMovie () {
	driver.get('http://localhost:5000/movie/add')
	await driver.findElement(By.id('movie-name')).sendKeys('芳华')
	await driver.findElement(By.id('movie-title')).sendKeys('芬芳易逝，血色年华')
	await driver.findElement(By.id('movie-doctor')).sendKeys('冯小刚')
	await driver.findElement(By.id('movie-year')).sendKeys('2017-9-7')
	await driver.findElement(By.id('movie-updateTime')).sendKeys('2017-10-2')
	await driver.findElement(By.id('movie-country')).sendKeys('中国')
	await driver.findElement(By.id('movie-language')).sendKeys('汉语')
	await driver.findElement(By.id('movie-summary')).sendKeys('一群正值芳华的青春少年，经历着成长中的爱情萌发与充斥着变数的人生命运故事')
	await driver.findElement(By.id('add-btn')).click()
}
// 修改电影
async function updateMovie () {
	// driver.get('http://localhost:5000/movie/list')
	await driver.findElement({xpath:'/html/body/div[4]/div/table/tbody/tr[1]/td[9]/a'}).click()
	await driver.findElement(By.id('movie-name')).sendKeys('2')
	await driver.findElement(By.id('movie-title')).sendKeys('3')
	await driver.findElement(By.id('movie-doctor')).sendKeys('4')
	await driver.findElement(By.id('movie-year')).sendKeys('5')
	await driver.findElement(By.id('movie-updateTime')).sendKeys('6')
	await driver.findElement(By.id('movie-country')).sendKeys('7')
	await driver.findElement(By.id('movie-language')).sendKeys('9')
	await driver.findElement(By.id('movie-summary')).sendKeys('8')
	await driver.findElement(By.id('update-btn')).click()
}
// 删除电影
const delMovie = async function () {
	await driver.findElement({xpath:'/html/body/div[4]/div/table/tbody/tr[2]/td[10]/button'}).click()
	const alert = driver.switchTo().alert()
	setTimeout(() => {
		// 确认删除
		alert.accept()
	}, 2000)
	
}

// 测试
const runTest = async function () {
	main()
	start()
}

// 执行测试
runTest()




// 截图操作
// const example = function () {
// 	driver.get('http://localhost:5000/register')
// 	// console.log(driver)
// 	let imagedata = driver.takeScreenshot()
// 	fs.writeFileSync(__dirname+'/image.png',imagedata,'base64')//将截图保存为图片，其中_dirname是当前目录，
// }
// example()


// 退出
// driver.quit()
