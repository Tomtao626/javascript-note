// Stream
// 这是一个抽象接口，Node 中有很多对象实现了这个接口

// Node.js，Stream 有四种流类型：
/*
- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。
*/

// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
/*
- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。
*/

// 从Stream中读取数据
var fs = require('fs');
var outData = '';
// 创建可读流
var readStream = fs.createReadStream('input1.txt');
// 设置编码为 utf-8
readStream.setEncoding('utf-8');
// 处理流事件 data -> end -> error
// data
readStream.on('data', function(chunk) {
    outData += chunk;
});
// end
readStream.on('end', function() {
    console.log(outData); // 人生无限公司官网地址：http://blog.tomtao.cn
});
// error
readStream.on('error', function(err) {
    console.log(err.stack);
});

console.log('读取程序执行完毕');

// 写入流
var inData = '吃葡萄不吐葡萄皮';
// 创建一个写入流
var writeStream = fs.createWriteStream('output.txt');
// 设置编码
writeStream.write(inData, 'utf-8');
// 标记文件末尾
writeStream.end();
// 处理流事件 finish -> error
// finish
writeStream.on('finish', function() {
    console.log('写入完成');
});
// error
writeStream.on('error', function(err) {
    console.log(err.stack);
})
console.log('写入程序执行完毕');

// 管道流
// 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
// 把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。
// 读取一个文件的内容 写入到另一个文件里
// 创建一个可读流 
var rStream = fs.createReadStream('input1.txt');
// 创建一个可写入流
var wStream = fs.createWriteStream('output.txt');
rStream.pipe(wStream);
console.log('管道流执行完毕');

// 链式流