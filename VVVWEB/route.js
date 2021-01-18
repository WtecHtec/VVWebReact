
const pageApi = require('./controller/pageApi/index')

const loginRecordApi = require('./controller/loginRecordApi/index')


const userApi = require('./controller/userApi/index')


const pageviewApi = require('./controller/pageviewApi')

module.exports = function(app) {

    // 首页
    // app.get('/', function(req, res) {
    //     res.render('index.html')
    // })
    

    //  页面
    pageApi(app)

    // 登录记录
    loginRecordApi(app)

    // 登录 注册
    userApi(app)

    //  页面管理
    pageviewApi(app)
  


}