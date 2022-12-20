var http = require('http');
var url = require('url');
var util = require('util');

// 获取GET请求内容
// 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/plain, charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true)));
}).listen(8089);
console.log('start server...8089');
/* 访问 http://127.0.0.1:8089/user?name=tomtao&ag=18&hobby=music，然后查看返回结果:
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=tomtao&ag=18&hobby=music',
  query: [Object: null prototype] { name: 'tomtao', ag: '18', hobby: 'music' },
  pathname: '/user',
  path: '/user?name=tomtao&ag=18&hobby=music',
  href: '/user?name=tomtao&ag=18&hobby=music'
}
*/

// 获取url中的参数
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type':'text/plain, charset=utf-8'});
    // 解析url参数
    var params = url.parse(req.url, true).query;
    res.write(params.name);
    res.write('\n');
    res.write(params.url);
    res.end();
}).listen(8087);
console.log('start server...8087');
/*访问 http://127.0.0.1:8087/user?name=tomtao&url=tomtao.cn 然后查看返回结果:
tomtao
tomtao.cn
*/

// 获取 POST 请求内容
/*
POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
*/
// 代码示例
var querystring = require('querystring');
http.createServer(function(req, res) {
    var postData = '';
    // 通过req的data事件监听函数，每当接收到新的数据，就累加到post中
    req.on('data', function(chunk){
        post += chunk;
    })
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){
        querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(8086);
console.log('start server...8086');

var http = require('http');
var querystring = require('querystring');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>tomtao626 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(8085);
console.log('start server...8085');
/*
访问 http://127.0.0.1:8085/ 然后查看返回结果:
网站名：18372620761
网站 URL：https://global.azure-devices-provisioning.net/0ne0063CDE4/registrations/abcdefgh-test/register?api-version=2021-06-01
*/