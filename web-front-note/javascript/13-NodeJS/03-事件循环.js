// 事件驱动模型
// Node.js使用事件驱动模型，当Web Server接收到请求后，就把它关闭然后进行处理，然后去服务下一个web请求。当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。
// https://www.runoob.com/wp-content/uploads/2015/09/event_loop.jpg

/*
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
// 触发事件
eventEmitter.emit('eventName');
 */

// 引入 events 模块  events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
var events = require('events');
// 创建eventEmitter
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var connectHandler = function connected() {
    console.log("连接成功");
    // 触发data_received事件
    eventEmitter.emit('data_received');
};
// 触发connect事件处理程序
eventEmitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function (){
   console.log("数据接收成功");
});
// 触发connection事件
eventEmitter.emit('connection');
console.log("程序执行完毕");
