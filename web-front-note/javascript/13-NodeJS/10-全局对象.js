// 表示当前正在执行的脚本的文件名
console.log(__filename);

// 表示当前执行脚本所在的目录。
console.log(__dirname);

// setTimeout(cb, ms) 延时执行 执行一次
// setTimeout(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
// 返回一个代表定时器的句柄值。
function printHello() {
    console.log("hello, world");
}
var t = setTimeout(printHello, 1000);

// clearTimeout(t)
// clearTimeout( t ) 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的定时器。
clearTimeout(t);

// setInterval(cb, ms) 循环执行 执行多次
// setInterval(cb, ms) 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。
// 返回一个代表定时器的句柄值。可以使用 clearInterval(t) 函数来清除定时器。
// setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
setInterval(printHello, 1500);

// console
/*
1 console.log([data][, ...])
    向标准输出流打印字符并以换行符结束。该方法接收若干 个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则 以类似于C 语言 printf() 命令的格式输出。
2 console.info([data][, ...])
    该命令的作用是返回信息性消息，这个命令与console.log差别并不大，除了在chrome中只会输出文字外，其余的会显示一个蓝色的惊叹号。
3 console.error([data][, ...])
    输出错误消息的。控制台在出现错误时会显示是红色的叉子。
4 console.warn([data][, ...])
    输出警告消息。控制台出现有黄色的惊叹号。
5 console.dir(obj[, options])
    用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
6 console.time(label)
    输出时间，表示计时开始。
7 console.timeEnd(label)
    结束时间，表示计时结束。
8 console.trace(message[, ...])
    当前执行的代码在堆栈中的调用路径，这个测试函数运行很有帮助，只要给想测试的函数里面加入 console.trace 就行了。
9 console.assert(value[, message][, ...])
    用于判断某个表达式或变量是否为真，接收两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。
*/

console.log('Hello world'); 
console.log('byvoid%diovyb'); 
console.log('byvoid%diovyb', 1991);
console.trace();
console.info("程序开始执行：");

var counter = 10;
console.log("计数: %d", counter);
console.time("获取数据");
//
// 执行一些代码
// 
console.timeEnd('获取数据');
console.info("程序执行完毕。")

// process
/*
1 exit
当进程准备退出时触发。
2 beforeExit
当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
3 uncaughtException
当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
4 Signal 事件
当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。
*/
process.on('exit', function(code) {

    // 以下代码永远不会执行
    setTimeout(function() {
      console.log("该代码不会执行");
    }, 0);
    
    console.log('退出码为:', code);
  });
console.log("程序执行结束");

// 属性
// 输出到终端
process.stdout.write("Hello World!" + "\n");
// 通过参数读取
process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});
// 获取执行路径
console.log(process.execPath);
// 平台信息
console.log(process.platform);
// 输出当前目录
console.log('当前目录: ' + process.cwd());
// 输出当前版本
console.log('当前版本: ' + process.version);
// 输出内存使用情况
console.log(process.memoryUsage());