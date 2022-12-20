// os 模块
// 提供基本的系统操作函数。
var os = require("os");
// CPU 的字节序
console.log('endianness : ' + os.endianness());
// 操作系统名
console.log('type : ' + os.type());
// 操作系统名
console.log('platform : ' + os.platform());
// 系统内存总量
console.log('total memory : ' + os.totalmem() + " bytes.");
// 操作系统空闲内存量
console.log('free memory : ' + os.freemem() + " bytes.");
/*打印结果
endianness : LE
type : Darwin
platform : darwin
total memory : 17179869184 bytes.
free memory : 199634944 bytes.
*/

// Path 模块
// 提供了处理和转换文件路径的工具。
var path = require("path");
// 格式化路径
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 连接路径
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换为绝对路径
console.log('resolve : ' + path.resolve('main.js'));
// 路径中文件的后缀名
console.log('ext name : ' + path.extname('main.js'));
/*打印结果
normalization : /test/test1/2slashes/1slash
joint path : /test/test1/2slashes/1slash
resolve : /Users/taotom/Documents/workspaces/person/jswork/javascript-note/web-front-note/js/13-NodeJS/main.js
ext name : .js
*/

// Net 模块
// 用于底层的网络通信。提供了服务端和客户端的的操作。
// 见14-NetDemo

// DNS 模块
// 用于解析域名。
var dns = require('dns');

dns.lookup('www.baidu.com', function onLookup(err, address, family) {
   console.log('ip 地址:', address);
   dns.reverse(address, function (err, hostnames) {
   if (err) {
      console.log(err.stack);
   }

   console.log('反向解析 ' + address + ': ' + JSON.stringify(hostnames));
});  
});

// Domain 模块
// 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。
var EventEmitter = require("events").EventEmitter;
var domain = require("domain");

var emitter1 = new EventEmitter();

// 创建域
var domain1 = domain.create();

domain1.on('error', function(err){
   console.log("domain1 处理这个错误 ("+err.message+")");
});

// 显式绑定
domain1.add(emitter1);

emitter1.on('error',function(err){
   console.log("监听器处理此错误 ("+err.message+")");
});

emitter1.emit('error',new Error('通过监听器来处理'));

emitter1.removeAllListeners('error');

emitter1.emit('error',new Error('通过 domain1 处理'));

var domain2 = domain.create();

domain2.on('error', function(err){
   console.log("domain2 处理这个错误 ("+err.message+")");
});

// 隐式绑定
domain2.run(function(){
   var emitter2 = new EventEmitter();
   emitter2.emit('error',new Error('通过 domain2 处理'));   
});


domain1.remove(emitter1);
emitter1.emit('error', new Error('转换为异常，系统将崩溃!'));