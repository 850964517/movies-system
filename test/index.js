const webdriver = require('selenium-webdriver'),
    By = webdriver.By;

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
async function openPage (targetPage) {
	console.log(`正在验证"${targetPage.name}": ${targetPage.url}`)
  await driver.get(targetPage.url)
}

async function main () {
	const targetPage = { name: '电影管理系统', url: `http://localhost:5000/register` }
	openPage(targetPage)
}
// 测试用户
const testUser = {
	username: 'pangpang',
	password: 'pangpang123'
}
// 注册
async function register () {
	await driver.findElement(By.id('username')).sendKeys(testUser.username)
	await driver.findElement(By.id('password')).sendKeys(testUser.password)
	await driver.findElement(By.id('res-password')).sendKeys(testUser.password)
	await driver.findElement(By.id('register-btn')).click()
}
// 登录
async function login () {
	await driver.findElement(By.id('username')).sendKeys(testUser.username)
	await driver.findElement(By.id('password')).sendKeys(testUser.password)
	driver.findElement(By.id('login-btn')).click()
}
// 添加电影
async function addMovie () {

}

// 执行测试
main().then(() => {
	console.log('连通性测试成功')
}, err => {
	console.log(err)
})
// 注册测试
register().then(() => {
	console.log('注册成功')
}, err => {
	console.log(err)
})

// 测试登录方法
login().then((data) => {
	console.log('登录成功')
}, err => {
	console.log(err)
})
// 退出
// driver.quit()
