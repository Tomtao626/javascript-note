// Node.js中的所有异步I/O操作在完成时，都会发送一个事件到事件队列。
// Node.js中的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件，一个fs.Stream对象会在文件被打开始时触发一个事件，所有这些产生事件的对象都是 events.EventEmitter 的实例。
// 一个 EventEmitter 对象如果在实例化时发生错误，会触发error事件。当添加新的监听器时，newListener事件会触发，当监听器被移除时，removeListener事件被触发。

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event', function () {
    console.log('some_event事件被触发');
}); // event对象注册了事件some_event的一个监听器
setTimeout(function () {
    event.emit('some_event');
}, 1000);

// EventEmitter的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。EventEmitter 支持 若干个事件监听器。当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
var emitter = new EventEmitter();
emitter.on("someEvent", function (args1, args2) {
   console.log("listener1",args1, args2);
});
emitter.on("someEvent", function (args1, args2) {
   console.log("listener2", args1, args2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
// emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是EventEmitter最简单的用法。
// EventEmitter 提供了多个属性，如 on 和 emit。on 函数用于绑定事件函数，emit 属性用于触发一个事件。