// 回调的定义 --- 把函数A传给另一个函数B调用，那么函数A就是回调函数。
// 例如在浏览器中发送 ajax 请求，就是常⻅的⼀个异步场景，发送请求后，需要等待一段时间，等服务端响应之后我们才能拿到结果。如果我们希望在异步结束之后执⾏某个操作，就只能通过**回调函数**这样的⽅式进⾏操作。

var dynamicFunc = function (callback) {
  setTimeout(function () {
      callback();
  }, 1000);
};

dynamicFunc(function () {
    console.log('tomtao626');
})
// dynamicFunc是一个异步函数，里面 setTimeout 会在1s之后调用传入的 callback 函数，按照上面的调用方式，1s之后，会打印结果


// 回调地狱 --- 如果多个异步函数存在依赖关系，需要等第一个异步函数执行完成后，才能执行第二个异步函数；等第二个异步函数执行完毕后，才能执行第三个异步函数），就需要多个异步函数进⾏层层嵌套，⾮常不利于后续的维护，而且会导致**回调地狱**的问题。
// 举例
//（1）定时器的代码举例：（回调地狱）
setTimeout(function () {
   console.log('tomtao626');
   setTimeout(function () {
       console.log('tomtao627');
       setTimeout(function () {
          console.log('tomtao628');
       }, 3000);
   }, 2000);
},1000);
//（2）Node.js读取文件的代码举例：（回调地狱）
fs.readFile(A, 'utf-8', function (err, data) {
    fs.readFile(B, 'utf-8', function (err, data) {
        fs.readFile(C, 'utf-8', function (err, data) {
            fs.readFile(D, 'utf-8', function (err, data) {
                console.log('qianguyihao:' + data);
            });
        });
    });
});
//（3）ajax 请求的代码举例：（回调地狱）
$.ajax('a.json', (res1) => {
    console.log(res1);
    ajax('b.json', (res2) => {
        console.log(res2);
        ajax('c.json', (res3) => {
            console.log(res3);
        });
    });
});

// 回调写法不一致的问题
// Node.js 读取文件时，成功回调和失败回调，是通过 error参数来区分
readFile('d:\\readme.text', function (err, data) {
    if (error) {
        console.log('文件读取失败');
    } else {
        console.log('文件读取成功');
    }
});

// jQuery的 ajax 写法中，成功回调和失败回调，是通过两个回调函数来区分
$.ajax({
    url: '/ajax.json',
    success: function (response) {
        console.log('文件读取成功');
    },
    error: function (err) {
        console.log('文件读取失败');
    },
});
// 上面的代码中，成功回调和失败回调，写法不统一，需要单独记忆，容易出错。

// Promise对象的用法和状态
/*使用Promise的步骤
（1）通过 new Promise() 构造出一个Promise实例。Promise 的构造函数中传入一个参数，这个参数是一个函数，该函数用于处理异步任务。
（2）函数中传入两个参数，reslove 和 reject，分别表示异步执行成功后的回调函数和步执行失败后的回调函数，代表着我们需要改变当前实例的状态到**已完成**或是**已拒绝**。
（3）通过 promise.then() 和 promise.catch() 处理返回结果。
 Promise 的精髓在于**对异步操作的状态管理**。
 - 初始化（等待中）：pending
 - 成功：fulfilled
 - 失败：rejected
 */

// （1）通过 new Promise() 构造出一个Promise实例。Promise 的构造函数中传入一个参数，这个参数是一个函数，该函数用于处理异步任务。
// -   如果请求成功了，则执行 resolve()，此时，promise 的状态会被自动修改为 fulfilled。
// -   如果请求失败了，则执行 reject()，此时，promise 的状态会被自动修改为 rejected

// （2）函数中传入两个参数，reslove 和 reject，分别表示异步执行成功后的回调函数和步执行失败后的回调函数，代表着我们需要改变当前实例的状态到**已完成**或是**已拒绝**。
// then() 括号里有两个参数，分别代表两个函数function1 和 function2
// - 如果 promise 的状态为 fulfilled（如果请求成功），则执行 function1 里的内容
// - 如果 promise 的状态为 rejected（意思是，如果请求失败），则执行 function2 里的内容
// 另外，resolve()和 reject()这两个方法，是可以给 promise.then()传递参数的。
// （3）通过 promise.then() 和 promise.catch() 处理返回结果。

// 伪代码
// 创建 promise 实例
let promise = new Promise((resolve, reject) => {
    // 进来之后 状态为pending
    console.log('同步代码'); // 代码是同步的
    // 开始执行异步操作 （写异步的代码）
    if (异步的ajax请求成功) {
        console.log('333');
        resolve('请求成功，并传参');//如果请求成功了，请写resolve()，此时，promise的状态会被自动修改为fulfilled（成功状态）
    } else {
        reject('请求失败，并传参'); //如果请求失败了，请写reject()，此时，promise的状态会被自动修改为rejected（失败状态）
    }
});
console.log('222');
// 调用promise的then(),开始处理成功和失败
promise.then(
    (successMsg) => {
        // 处理 promise 的成功状态：如果promise的状态为fulfilled，则执行这里的代码
        console.log(successMsg, '成功了'); // 这里的 successMsg 是前面的 resolve('请求成功，并传参')
    },
    (errorMsg) => {
        //处理 promise 的失败状态：如果promise的状态为rejected，则执行这里的代码
        console.log(errorMsg, '失败了'); // 这里的 errorMsg 是前面的 reject('请求失败，并传参') 传过来的参数
    }
);

/*
new Promise本身是同步代码，promise如果没有使用resolve或reject更改状态时，状态为pending
 */
// 代码 1
const promiseA = new Promise((resolve, reject) => {});
console.log(promiseA); // 此时promise的状态为pending（准备阶段）
// 上面的代码中，我既没有写 reslove()，也没有写 reject()。也就是说，这个 promise 一直处于准备阶段。
// 当完成异步任务之后，状态分为成功或失败，此时我们就可以用 reslove() 和 reject() 来修改 promise 的状态

// 代码 2
new Promise((resolve, reject) => {
    console.log('promise1'); // 这行代码是同步代码，会立即执行
}).then((res) => {
    console.log('promise then:' + res); // 这行代码不会执行，因为前面没有写 resolve()，所以走不到 .then
});
// 上方代码，仔细看注释：如果前面没有写 `resolve()`，那么后面的 `.then`是不会执行的。

// 代码 3
new Promise((resolve, reject) => {
    resolve();
    console.log('promise1'); // 代码1：同步任务，会立即执行
}).then(res => {
    console.log('promise  then'); // 代码2：异步任务中的微任务
});

console.log('千古壹号'); // 代码3：同步任务
/*打印结果
promise1
千古壹号
promise  then
 */
// 代码解释：代码 1 是同步代码，所以最先执行。代码 2 是**微任务**里面的代码，所以要先等同步任务（代码 3）先执行完。当写完`resolve();`之后，就会立刻把 `.then()`里面的代码加入到微任务队列当中。

// Promise 的状态一旦改变，就不能再变
const p = new Promise((resolve, reject) => {
   resolve(1); // 代码执行到这里时， promise状态是 fulfilled
    reject(2); // 尝试修改状态为 rejected，是不行的
});
p.then((res)=>{
    console.log(res);
}).catch((err)=>{
   console.log(err);
});

/*
1、promise 有三种状态：等待中、成功、失败。等待中状态可以更改为成功或失败，已经更改过状态后⽆法继续更改（例如从失败改为成功）。
2、promise 实例中需要传⼊⼀个函数，这个函数接收两个参数，执⾏第⼀个参数之后就会改变当前 promise 为「成功」状态，执⾏第⼆个参数之后就会变为「失败」状态。
3、通过 .then ⽅法，即可在上⼀个 promise 达到成功时继续执⾏下⼀个函数或 promise。同时通过 resolve 或 reject 时传⼊参数，即可给下⼀个函数或 promise 传⼊初始值。
4、失败的 promise，后续可以通过 promise 自带的 .catch ⽅法或是 .then ⽅法的第⼆个参数进⾏捕获。
 */

// Promise 封装

// 封装定时器
// 传统写法
// 定一个异步的延迟函数：异步函数结束1s之后，再执行cb回调函数
function fun1(cb) {
    setTimeout(function () {
       console.log('即将执行cb回调函数');
       cb();
    }, 1000);
}

// 先执行异步函数func1，再执行回调函数 myCallback
fun1(myCallback);

// 定义回调函数
function myCallback() {
    console.log('我是延迟执行的cb回调函数');
}

// 精简版
// 定义一个异步的延迟函数：异步函数结束1秒之后，再执行cb回调函数
function fun2(cb) {
    setTimeout(cb, 1000);
}
// 先执行异步函数fun1，再执行回调函数
fun2(function () {
    console.log('我是延迟执行的cb回调函数');
});
// 在异步结束后通过传入回调函数的方式执⾏函数。

// Promise写法
function myPromise() {
    return new Promise((resolve) => {
       setTimeout(resolve, 1000);
    });
}
/* 【重要】上面的 myPromise 也可以写成：
function myPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}
*/
// 先执行异步函数 myPromise，再执行回调函数
myPromise().then(() => {
   console.log('我是延迟执行的回调函数');
});

// Promise 封装 Ajax 请求
// 传统写法
function ajax(url,success,fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            success && success(xmlhttp.responseText);
        }else {
            // 这里的 && 符号，意思是：如果传了 fail 参数，就调用后面的 fail()；如果没传 fail 参数，就不调用后面的内容。因为 fail 参数不一定会传。
            fail && fail(new Error('接口请求失败'));
        }
    };
}
// 执行ajax请求
ajax(
    'a.json',
    (res) => {
        console.log('tomtao 第一个接口请求成功:' + JSON.stringify(res));
    },
    (err) => {
        console.log('tomtao 请求失败:' + JSON.stringify(err));
    }
);
// 定义和执行ajax时，需要传入的success和fail两个回调函数，进而执行回调函数
// 注意看注释，`callback && callback()`这种格式的写法，很常见。

// Promise 写法
/*
有了 promise之后，不需要传入回调函数，而是：
- 先将 promise 实例化
- 然后在原来执行回调函数的地方，改为执行对应的改变 promise 状态的函数
- 并通过 then ... catch 或者 then ... then 等写法，实现链式调用，提高代码可读性
和传统写法相比，promise 在写法上的大致区别是：定义异步函数的时候，将 callback 改为 resolve 和 reject，待状态改变之后，我们在外面控制具体执行哪些函数。
 */
// 写法1
// 封装 ajax 请求：传入回调函数 success 和 fail
function ajax1(url, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            success && success(xmlhttp.responseText);
        } else {
            // 这里的 && 符号，意思是：如果传了 fail 参数，就调用后面的 fail()；如果没传 fail 参数，就不调用后面的内容。因为 fail 参数不一定会传。
            fail && fail(new Error('接口请求失败'));
        }
    };
}
// model层的接口封装
function promiseB() {
    return new Promise((resolve, reject) => {
        ajax1('xxx_a.json', (res) => {
            // 这里的 res 是接口的返回结果。返回码 retCode 是动态数据。
            if (res.retCode == 0) {
                // 接口请求成功时调用
                resolve('request success' + res);
            } else {
                // 接口请求失败时调用
                reject({ retCode: -1, msg: 'network error' });
            }
        });
    });
}

// 第二步 业务层的接口调用 这里的 data 就是从 resolve 和 reject 传过来的，也就是从接口拿到的数据
promiseB().then((res)=>{
    // 从 resolve 获取正常结果：接口请求成功后，打印接口的返回结果
    console.log(res);
}).catch((err)=>{
    // 从 reject 获取异常结果
    console.log(err);
});
/*
上方代码中，当从接口返回的数据`data.retCode`的值（接口返回码）不同时，可能会走 resolve，也可能会走 reject，这个由你自己的业务决定。
接口返回的数据，一般是`{ retCode: 0, msg: 'qianguyihao' }` 这种 json 格式， retCode 为 0 代表请求接口成功，所以前端对应会写`if (res.retCode == 0) `这样的逻辑。
另外，上面的写法中，是将 promise 实例定义成了一个**函数** `promiseA`。我们也可以将 promise 实例定义成一个**变量** `promiseB`，达到的效果和上面的代码是一模一样的。写法如下：（写法上略有区别）
 */

// 写法2
// model层的接口封装
const promiseC = new Promise((resolve, reject)=>{
    ajax1('xxx_a.json', (res) => {
        // 这里的 res 是接口的返回结果。返回码 retCode 是动态数据。
        if (res.retCode == 0) {
            // 接口请求成功时调用
            resolve('request success' + res);
        } else {
            // 接口请求失败时调用
            reject({ retCode: -1, msg: 'network error' });
        }
    });
});
// 业务层的接口调用，这里的 data 就是 从 resolve 和 reject 传过来的，也就是从接口拿到的数据
promiseC.then((res)=>{
    // 从 resolve 获取正常结果
    console.log(res);
}).catch((err)=>{
    // 从 reject 获取异常结果
    console.log(err);
});
// 如果是写法1（将promise实例定义为函数），则调用promise的时候是 promiseB().then()
// 如果你用的是写法 2（将 promise 实例定位为函数），则调用的时候用的是`promiseC.then()`。写法 1 多了个括号，不要搞混了。

// 处理reject 失败状态的两种写法
// - 写法1：通过catch方法捕捉 状态已变更为 reject 时的 promise
// - 写法2：then 可以传两个参数，第一个参数为 resolve 后执行的，第二个参数为 reject 后执行
// 两种写法的代码格式
// model层的接口封装
function promiseD() {
    return new Promise((resolve, reject) => {
        // 这里做异步任务（比如 ajax 请求接口，或者定时器）
    });
}
const onResolve = function (res) {
    console.log(res);
}
const onReject = function (err) {
    console.log(err);
}

// 写法1 通过catch捕获 状态变为已拒绝时的 promise
promiseD().then(onResolve).catch(onReject);
// 写法2 then参数处理 第⼀个参数为 resolve 后执⾏，第⼆个参数为 reject 后执⾏
promiseD().then(onResolve, onReject);
// 错误写法 通过 try catch 捕获状态变为已拒绝时的 promise
// 这种写法是错误的，因为 try catch只能捕获同步代码里的异常，而  promise.reject() 是异步代码。
try {
    promiseD().then(onResolve);
} catch (e) {
    // 语法上，catch必须要传入一个参数，否则报错
    onReject(e);
}
// 当异步函数抛出异常时，对于宏任务而言，执行函数时已经将该函数推入栈，此时并不在 try-catch 所在的栈，所以 try-catch 并不能捕获到错误。对于微任务而言，比如 promise，promise 的构造函数的异常只能被自带的 reject 也就是.catch 函数捕获到。

// 写法1中，promiseD().then(onResolve).catch(onReject); 和 promiseD().catch(onReject).then(onResolve);的区别在于：前者可以捕获到then里面的异常，但后者不可以。
// 两种写法代码举例
function promiseE() {
    return new Promise((resolve, reject)=>{
        // 这里做异步任务（比如 ajax 请求接口，或者定时器）
    });
}
// 写法1
promiseE().then((res)=>{
    // 从 resolve 获取正常结果
    console.log('接口请求成功时，走这里');
    console.log(res);
}).catch((err)=>{
    // 从 reject 获取异常结果
    console.log('接口请求失败时，走这里');
    console.log(err);
}).finally(()=>{
    console.log('无论接口请求成功与否，都会走这里');
});
// 写法2
promiseB()
    .then(
        (res) => {
            // 从 resolve 获取正常结果
            console.log('接口请求成功时，走这里');
            console.log(res);
        },
        (err) => {
            // 从 reject 获取异常结果
            console.log('接口请求失败时，走这里');
            console.log(err);
        }
    )
    .finally(() => {
        console.log('无论接口请求成功与否，都会走这里');
    });
// 写法 1 和写法 2 的作用是完全等价的。只不过，写法 2 是把 catch 里面的代码作为 then 里面的第二个参数而已。