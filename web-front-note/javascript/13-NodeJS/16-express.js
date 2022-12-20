// 安装
// npm install express --save
// 以上命令会将 Express 框架安装在当前目录的 node_modules 目录中， node_modules 目录下会自动创建 express 目录。以下几个重要的模块是需要与 express 框架一起安装的：

// body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
// cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
// multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

// npm install body-parser --save
// npm install cookie-parser --save
// npm install multer --save

// 查看express版本号
// npm list express

//express_demo.js 文件
var express = require('express');
var app = express();

// 路由

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.post('/', function(req, res) {
  console.log('主页POST请求');
  res.send('Hello POST');
})

app.get('/del_user', function (req, res){
    console.log('del_user请求');
    res.send('del_user');
})

app.get('/list_user', function (req, res){
    console.log('list_user请求');
    res.send('list_user');
})

app.get('/ab*cd', function (req, res){
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})

// 静态文件
app.use('/public', express.static('public'));

// cookie管理
var cookieParser = require('cookie-parser');
var util = require('util');
app.use(cookieParser());

app.get('/cookie', function(req, res) {
  console.log("Cookies: " + util.inspect(req.cookies));
  /*Cookies: {
  csrftoken: 'ca3D9dZWKVRSgORKezIlomcsbQC9eI6S0FLGxfiiWRkZB3eM10ZGTgwY3STe8p4C'
  }*/
})

var server = app.listen(8082, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port);
})