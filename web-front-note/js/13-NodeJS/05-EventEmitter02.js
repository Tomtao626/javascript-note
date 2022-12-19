var events = require('events');

// 以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。
var eventEmitter = new events.EventEmitter();
// 创建监听函数listener1
var listener1 = function listener1() {
    console.log("监听器 listener1 执行");
}
// 创建监听函数listener2
var listener2 = function listener2() {
    console.log("监听器 listener2 执行");
}
// 绑定connection事件，处理函数为 listener1
eventEmitter.addListener('connection', listener1);
// 绑定connection事件，处理函数为 listener2
eventEmitter.on('connection', listener2);
// 计算 connection事件的监听器数量
var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 监听器监听连接事件");
// 处理connection事件
eventEmitter.emit('connection');
// 移除绑定的监听器 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("监听器 listener1 不再受监听 ");
// 再次触发连接事件
eventEmitter.emit('connection');
eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 监听器监听连接事件");
console.log("程序执行完毕");

/* 打印结果
2 监听器监听连接事件
监听器 listener1 执行
监听器 listener2 执行
监听器 listener1 不再受监听 
监听器 listener2 执行
1 监听器监听连接事件
程序执行完毕
*/

// error事件
// EventEmitter定义了一个特殊的error事件，它包含了错误的语义，遇到 异常的时候通常会触发 error 事件。
// 当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并输出错误信息。
eventEmitter.emit('error');