// util是一个Node.js的核心文件
const { urlToHttpOptions } = require('url');
const util = require('util');

// util.callbackify
// 将async异步函数（或一个返回值为Promise的函数）转换为遵循异常优先的回调风格的函数，例如将 (err, value) => ... 回调作为最后一个参数。 在回调函数中，第一个参数为拒绝的原因（如果 Promise 解决，则为 null），第二个参数则是解决的值。
async function fn() {
    return 'hello,world';
}
const callFunction = util.callbackify(fn);
callFunction((err,ret)=>{
    if (err) throw err;
    console.log(ret); // hello,world
});

// 回调函数是异步执行的，并且有异常堆栈错误追踪。 如果回调函数抛出一个异常，进程会触发一个 'uncaughtException' 异常，如果没有被捕获，进程将会退出。
// null 在回调函数中作为一个参数有其特殊的意义，如果回调函数的首个参数为 Promise 拒绝的原因且带有返回值，且值可以转换成布尔值 false，这个值会被封装在 Error 对象里，可以通过属性 reason 获取。
function fn1() {
    return Promise.reject(null);
}
const callbackifyFunction = util.callbackify(fn1);
callbackifyFunction((err, ret) => {
    err && err.hasOwnProperty('reson') && err.reason === null; 
});

// 继承
class Base{
    name = 'base';
    base = 1991;
    sayHello = function() {
        console.log('Hello ' + this.name);
    }
}
Base.prototype.showName = function() {
    console.log(this.name);
}

class Sub extends Base{
    name = "sub";
}

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
objSub.sayHello();
console.log(objSub);

// util.inspect
// 将任意对象转换为字符串  util.inspect(object,[showHidden],[depth],[colors])
// showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
// depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归 2 层，指定为 null 表示将不限递归层数完整遍历对象。 如果 colors 值为 true，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
// 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了 toString 方法也不会调用。
function Person() {
    this.name = "tomtao";
    this.toString =function() {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
/*打印结果
Person { name: 'tomtao', toString: [Function (anonymous)] }
Person {
  name: 'tomtao',
  toString: <ref *1> [Function (anonymous)] {
    [length]: 0,
    [name]: '',
    [arguments]: null,
    [caller]: null,
    [prototype]: { [constructor]: [Circular *1] }
  }
}
*/