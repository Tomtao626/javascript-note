// 在执行一个 Promise 对象的时候，当走完 resolve();之后，就会立刻把 .then() 里面的代码加入到 微任务队列中
// 任务的一般执行顺序：同步任务 --> 微任务 --> 宏任务

// 举例 1：宏任务和微任务的执行顺序
setTimeout(() => {
    // 宏任务
    console.log('setTimeout');
}, 0);

new Promise((resolve, reject) => {
    resolve();
    console.log('promise1'); // 同步任务
}).then((res) => {
    // 微任务
    console.log('promise then');
});

console.log('tomtao');
/*打印结果
promise1
tomtao
promise then
setTimeout
 */

// 举例 2：宏任务和微任务的嵌套
new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve();
       console.log('setTimeout');
   }, 0);
   console.log('promise1');
}).then((res) => {
    // 微任务
    console.log('promise then');
});
console.log('tomtao626');
/*打印结果
promise1
qianguyihao
setTimeout
promise then
 */
// 上方代码解释：在执行宏任务的**过程中**，创建了一个微任务。但是需要**先把当前这个宏任务执行完**，再去**创建并执行**微任务。
