const express = require('express')
const router = require('./route')
var bodyParser = require('body-parser')
const path = require('path')

const expressJwt = require('express-jwt')
const token = require('./utils/jwt/jwt.js')


const app = express()

// 跨域
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    if (req.method == 'OPTIONS') {
      res.send(200); /让options请求快速返回/
    }
    else {
      next();
    }
});

//  校验token
app.use(expressJwt({
    secret: 'wtechtec',  // 签名的密钥 或 PublicKey
    algorithms: ['HS256']
  }).unless({
    path: ['/signIn', '/signup','/ViewPage']  // 指定路径不经过 Token 解析
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('html', require('express-art-template'));
app.use('/public', express.static(path.join(__dirname, './public')))





router(app)


app.use(function ( req, res, next) {
    res.status(404).send('Not found!')
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {   
      res.status(401).send('token 过期')
      return 
    }
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


app.listen(5000, function(){
    console.log('running 127.0.0.1:5000')
})