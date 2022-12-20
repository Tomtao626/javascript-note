// async 返回的是 Promise 实例对象
// await 可以得到异步结果
// 声明一个函数是异步函数。异步函数会自动（由解释器）使用 Promise 封装返回值，同时，其内部可以使用 await 关键字。
// 最终由 async/await/Promise 配合由解释器将类似同步方式编写的代码以正确的异步逻辑来调用

// async
async function testasync() {
    return "hello world";
}
const result = testasync();
console.log(result); // Promise { 'hello world' }
result.then((v=>{
    console.log(v); // hello world 由于是一个 Promise 对象，所以直接 .then() 调用
}));
// 下面这种写法也可以
testasync().then(v=>{
    console.log(v); // hello world
})
// async函数返回的是一个 Promise 实例对象，所以在最外层不能使用 await 获取返回值的情况下，直接 .then() 调用
// 如果async函数没有返回值，会直接返回 Promise.resolve(undefined);
// 在没有await的情况下，async函数会直接返回。

// await
// 等待一个async函数执行完成
// await后面可以接 普通函数调用或是某个变量的
function getSomething() {
    return "something";
}
async function TestAsync() {
    return Promise.resolve('hello testasync');
}
async function test() {
    const v1 = await getSomething();
    const v2 = await TestAsync();
    console.log(v1,v2);
}
test(); // something hello testasync

// 用 setTimeout模拟耗时操作 --- 普通写法
function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

takeLongTime().then(v => {
    console.log("got", v);
});

// 用 setTimeout模拟耗时操作 --- async/await写法
async function timeTest() {
    const v = await takeLongTime();
    console.log(v);
}
timeTest();

// await 等待的如果是一个 Promise 对象，就会阻塞后面的代码（await 阻塞的只是当前路径，并不阻塞其它路径的代码），等待着 Promise.resolve()，然后得到 resolve 的值，作为await表达式的结果
// await 等待是不是 Promise 对象，那 await 表达式的运算结果就是它等到的东西。

// 如果一个函数本身就返回 Promise 对象，加 async 和不加 async 还是有一点点区别：加了 async 之后外面得到 Promise 对象并不是 return 的那一个，参阅代码：
(() => {
    let promise;
    async function test() {
        promise = new Promise(resolve => resolve(0));
        promise.mark = "hellow";
        return promise;
    }

    const gotPromise = test();
    console.log(`is same object?: ${promise === gotPromise}`);  // false
    console.log(`promise.mark: ${promise.mark}`);               // hellow
    console.log(`gotPromise.mark: ${gotPromise.mark}`);         // undefined
})();
// 如果我们需要在返回的 Promise 对象上附加一些东西，比如 cancel()，就得小心一点。

// async/await 处理多个 Promise 的 .then() 链 --- Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化它
// 看例子 用 setTimeout模拟耗时操作
function calcLongTime(n) {
    /**
     * 传入参数 n，表示这个函数执行的时间（毫秒）
     * 执行的结果是 n + 200，这个值将用于下一步骤
     */
    return new Promise(resolve => {
        setTimeout(() => resolve(n+200), n);
    });
}
// 三个函数
function step1(n) {
    console.log(`step1 with ${n}`);
    return calcLongTime(n);
}
function step2(n) {
    console.log(`step2 with ${n}`);
    return calcLongTime(n);
}
function step3(n) {
    console.log(`step3 with ${n}`);
    return calcLongTime(n);
}
// .then() 调用
function doIt() {
    console.time("doIt");
    const time1 = 300;
    step1(time1)
        .then(time2 => step2(time2))
        .then(time3 => step3(time3))
        .then(result => {
            console.log(`result is ${result}`);
            console.timeEnd("doIt");
        });
}
doIt();
/* 打印结果
step1 with 300
step2 with 500
step3 with 700
result is 900
doIt: 1.503s
输出结果 result 是 step3() 的参数 700 + 200 = 900。doIt() 顺序执行了三个步骤，一共用了 300 + 500 + 700 = 1500 毫秒，和 console.time()/console.timeEnd() 计算的结果一致。
 */

// async/await 实现 .then() 链式调用
async function DoIt() {
    console.time("DoIt");
    const time1 = 300;
    const time2 = await step1(time1);
    const time3 = await step2(time2);
    const result2 = await step3(time3);
    console.log(`result2 is ${result2}`);
    console.timeEnd("DoIt");
}
DoIt();
// 结果和之前的 Promise 实现是一样的，但是这个代码看起来是不是清晰得多，几乎跟同步代码一样
/* 打印结果
step1 with 300
step2 with 500
step3 with 700
result is 900
doIt: 1.503s
 */

// 下一次函数的执行依赖于上一个函数的返回结果
function step11(n) {
    console.log(`step1 with ${n}`);
    return calcLongTime(n);
}
function step22(m, n) {
    console.log(`step2 with ${m} and ${n}`);
    return calcLongTime(m+n);
}
function step33(k,m,n) {
    console.log(`step3 with ${k} and ${m} and ${n}`);
    return calcLongTime(k+m+n);
}
// async/await 调用
async function doItAsyncFunc() {
    console.time("doItAsyncFunc");
    const time11 = 300;
    const time22 = await step11(time11);
    const time33 = await step22(time11, time22);
    const result3 = await step33(time11, time22, time33);
    console.log(`result3 is ${result3}`);
    console.timeEnd("doItAsyncFunc");
}
doItAsyncFunc();
/*打印结果
// step11 with 300
// step22 with 800 = 300 + 500
// step33 with 1800 = 300 + 500 + 1000
// result3 is 2000
// doItAsyncFunc: 2.904s
 */

// 普通 Promise 调用
function doItFunc() {
    console.time("doItFunc");
    const time1 = 300;
    step1(time1)
        .then(time2 => {
            return step2(time1, time2)
                .then(time3 => [time1, time2, time3]);
        })
        .then(times => {
            const [time1, time2, time3] = times;
            return step3(time1, time2, time3);
        })
        .then(result => {
            console.log(`result4 is ${result}`);
            console.timeEnd("doItFunc");
        });
}

doItFunc();

// 第三种调用方法
// promise 写法
var p1 = 1, p2, p3;
step1(p1)
    .then((param) => step2(p1, p2=param))
    .then((param) => step3(p1, p2, p3=param))
    .then((param) => {console.log('result is', param);});