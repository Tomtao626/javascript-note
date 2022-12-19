// Buffer
// 创建一个专门存放二进制数据的缓冲区

// Buffer和字符编码
// Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。
const buf = Buffer.from('tomtao626', 'ascii');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));
console.log(buf.toString('utf-8'));

/*
Node.js 目前支持的字符编码包括：
- ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
- utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
- utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
- ucs2 - utf16le 的别名。
- base64 - Base64 编码。
- latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
- binary - latin1 的别名。
- hex - 将每个字节编码为两个十六进制字符。
*/

// 创建Buffer类
/*
Buffer 提供了以下 API 来创建 Buffer 类：
- Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
- Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
- Buffer.allocUnsafeSlow(size)
- Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
- Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
- Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
- Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例
*/
// 创建一个元素为0，长度为10的buffer
const buf1 = Buffer.alloc(10);
console.log(buf1.toString('hex'));
// 创建一个长度为10，且用0x1填充的buffer
const buf2 = Buffer.alloc(10, 1);
console.log(buf2.toString('hex'));
// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

// 写入缓冲区
// buf.write(string[, offset[, length]][, encoding])
/*参数描述
string - 写入缓冲区的字符串。
offset - 缓冲区开始写入的索引值，默认为 0 。
length - 写入的字节数，默认为 buffer.length
encoding - 使用的编码。默认为 'utf8' 。
*/
bufW = Buffer.alloc(256);
len = bufW.write("www.blog.tomtao.cn");
console.log("写入字节数: " + len); // 写入字节数: 18

// 从缓冲区读取数据
bufR = Buffer.alloc(26);
for(var i=0;i<26;i++) {
    bufR[i] = i + 97;
}

console.log(bufR.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log(bufR.toString('ascii',0,5));   //使用 'ascii' 编码, 并输出: abcde
console.log(bufR.toString('utf8',0,5));    // 使用 'utf8' 编码, 并输出: abcde
console.log(bufR.toString(undefined,0,5)); // 使用默认的 'utf8' 编码, 并输出: abcde


// 将buffer转换为json对象
// buf.toJSON()
// 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用该 toJSON()。
const bufJson = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(bufJson);
console.log(json); // {"type":"Buffer","data":[1,2,3,4,5]}
const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
});
console.log(copy); // <Buffer 01 02 03 04 05>

// 缓冲区合并
var buffer1 = Buffer.from(("tomtao626\n"));
var buffer2 = Buffer.from(("blog.tomtao.cn"));
var buffer3 = Buffer.concat([buffer1, buffer2]);
console.log(buffer3.toString()); // tomtao626\nblog.tomtao.cn

// 缓冲区比较
var b1 = Buffer.from('ABC');
var b2 = Buffer.from('ABCD');
result = b1.compare(b2);
if (result>0) {
    console.log(b1 + '在' + b2 + '之后');
} else if (result = 0) {
    console.log(b1 + '和' + b2 + '相同');
} else {
    console.log(b1 + '在' + b2 + '之前'); // ABC在ABCD之前
}

// 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
/*参数描述如下：
targetBuffer - 要拷贝的 Buffer 对象。
targetStart - 数字, 可选, 默认: 0
sourceStart - 数字, 可选, 默认: 0
sourceEnd - 数字, 可选, 默认: buffer.length
*/
// 没有返回值
var b3 = Buffer.from('abcdefghijk');
var b4 = Buffer.from('tomtao626');
//将 b4 插入到 b3 指定位置上
b4.copy(b3, 5);
console.log(b3.toString());

// 缓冲区裁剪
// buf.slice([start[, end]])
/*参数描述如下：
start - 数字, 可选, 默认: 0
end - 数字, 可选, 默认: buffer.length
返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
*/
var bufferS = Buffer.from("www.tomtao.cn");
var bufferSlice = bufferS.slice(3,8);
console.log(bufferSlice.toString()); // .tomt

// 缓冲区长度
var bufferL = Buffer.from("www.tomtao.cn");
console.log(bufferL.length); // 13