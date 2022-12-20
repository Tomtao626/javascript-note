console.log("同步任务1");
setTimeout(function () {
    console.log("异步任务")
},1000);
console.log("同步任务2");
/* 打印结果
同步任务1
同步任务2
异步任务
 */
// 代码解释：第一行代码是同步任务，会立即执行；定时器里的回调函数是异步任务，需要等 1 秒后才会执行。假如定时器里的代码是同步任务，那需要等待1秒后，才能执行最后一行代码`console.log('同步任务2')`，也就是造成了主线程里的同步任务阻塞，这不是我们希望看到的。

// 需要使用异步的场景
/*
（1）事件监听（比如说 按钮绑定点击事件之后，用户爱点不点，不可能卡在按钮那里，什么都不做，所以应该用 异步）
（2）回调函数
    （2-1）定时器 setTimeout(定时炸弹) setInterval(循环执行)
    （2-2）ajax请求
    （2-3）Node.js中的一些方法回调
（3）ES6中的Promise，Generator，async/await
现在的大部分软件项目，都是前后端分离的。后端生成接口，前端请求接口。前端发送 ajax 请求，向后端请求数据，然后**等待一段时间**后，才能拿到数据。这个请求过程就是异步任务。
 */

// 接口常见的调用方式
/*
（1）原生ajax，基于jQuery的ajax
（2）Promise
（3）Fetch
（4）axios
 */

// 事件循环机制
// http://img.smyhvae.com/20210517_1431.png
/* 执行顺序
同步任务：进入主线程后，立即执行
异步任务：会先进入Event Table；等时间到了之后，再进入Event Queue，然后排队
当主线程的任务执行完毕后，此时主线程处于空闲状态，于是会读取 Event Queue中的任务队列。如果有任务，则进入到主线程去执行。
 */

// 多次异步调用的顺序
// - 多次异步调用的结果，顺序可能不同步。
// - 异步调用的结果如果**存在依赖**，则需要通过回调函数进行嵌套。
console.log(1);
setTimeout(() => {
    console.log(2);
}, 1000);
console.log(3);
console.log(4);
/*打印结果
1
3
4
2
先等同步任务执行完成后，再执行异步任务。
 */

// 如果我把上面的等待时间，从 1 秒改成 0 秒，你看看打印结果会是什么。
console.log(1);
setTimeout(() => {
    console.log(2);
}, 0);
console.log(3);
console.log(4);
/*打印结果
1
3
4
2
先等同步任务执行完成后，再执行异步任务。
 */

setTimeout(() => {
    console.log('异步任务666');
}, 2000);

function sleep(time){
    var timeStamp = new Date().getTime();
    var endTime = timeStamp + time;
    while(true){
        if (new Date().getTime() > endTime){
            return;
        }
    }
}
// 伪代码
sleep(5000); //表示很耗时的同步任务

setTimeout(() => {
    console.log('异步任务');
}, 1000);

// 上面的代码中，等到 1 秒之后，真的会执行异步任务吗？其实不是。
// 在浏览器中， setTimeout()/ setInterval() 的每调用一次定时器的最小时间间隔是**4毫秒**，这通常是由于函数嵌套导致（嵌套层级达到一定深度），或者是由于已经执行的 setInterval 的回调函数阻塞导致的。
// 上面的案例中，异步任务需要等待 1004 毫秒之后，才会从 Event Table 进入到 Event Queue。这在面试中也经常被问到。

// 加载图片的异步任务
function loadImage(file, success,fail) {
    const img = new Image();
    img.src = file;
    img.onload = () => {
      success(img);
    };
    img.onerror = () => {
      fail(new Error('img load fail'));
    };
}

loadImage(
    'image/test.png',
    (img) => {
        console.log('图片加载成功');
        document.body.appendChild(img);
        img.style.border = 'solid 2px red';
    },
    (error) => {
        console.log('图片加载失败');
        console.log(error);
    }
)

// 定时器计时，移动 DOM 元素
// 函数封装：定义一个定时器，每间隔 delay 毫秒之后，执行 callback 函数
function myInterval(callback, delay = 100) {
    let timeId = setInterval(() => callback(timeId), delay);
}

myInterval((timeId) => {
    // 每间隔 500毫秒之后，向右移动 .box 元素
    const myBox = document.getElementsByClassName('box')[0];
    const left = parseInt(window.getComputedStyle(myBox).left);
    myBox.style.left = left + 20 + 'px';
    if (left > 300) {
        clearInterval(timeId);

        // 每间隔 10 毫秒之后，将 .box 元素的宽度逐渐缩小，直到消失
        myInterval((timeId2) => {
            const width = parseInt(window.getComputedStyle(myBox).width);
            myBox.style.width = width - 1 + 'px';
            if (width <= 0) clearInterval(timeId2);
        }, 10);
    }
}, 200);