// Promise 的链式调用：处理多次 Ajax 请求【重要】
/*
* 实际开发中，我们经常需要同时请求多个接口。比如说：在请求完`接口1`的数据`data1`之后，需要根据`data1`的数据，继续请求接口 2，获取`data2`；然后根据`data2`的数据，继续请求接口 3。
换而言之，现在有三个网络请求，请求 2 必须依赖请求 1 的结果，请求 3 必须依赖请求 2 的结果，如果按照往常的写法，会有三层回调，会陷入“回调地狱”。
这种场景其实就是接口的多层嵌套调用。有了 Promise 之后，我们可以把多层嵌套调用按照**线性**的方式进行书写，非常优雅。也就是说：Promise 可以把原本的**多层嵌套写法**改进为**链式写法**。
* */

// ES5传统写法
// 封装 ajax 请求 传入回调函数 success 和 fail
function ajax_es5(url, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          success && success(xmlhttp.responseText);
        } else {
          fail && fail(new Error('接口请求失败'));
      }
    };
}
// 执行 ajax 请求
ajax_es5(
    'a.json',
    (res) => {
        console.log('接口1请求成功:' + JSON.stringify(res));
        ajax('b.json', (res) => {
            console.log('接口2请求成功:' + JSON.stringify(res));
            // ajax嵌套调用
            ajax('c.json', (res) => {
                console.log('接口3请求成功:' + JSON.stringify(res));
            });
        });
    },
    (err) => {
        console.log('请求失败:' + JSON.stringify(err));
    }
)
// 上面的代码层层嵌套，可读性很差，而且出现了我们常说的回调地狱问题。

// Promise 链式调用
// 封装 ajax 请求 传入回调函数 success 和 fail
function ajax_promise(url, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            success && success(xmlhttp.responseText);
        } else {
            fail && fail(new Error('接口请求失败'));
        }
    };
}
// promise 调用
new Promise((resolve, reject) => {
    ajax_promise('a,json', (res) => {
        console.log(res);
        resolve();
    });
}).then((res) => {
        console.log('a success');
        return new Promise((resolve, reject) => {
            ajax_promise('b,json', (res) => {
                console.log(res);
                resolve();
            });
        });
    }).then((res)=>{
        console.log('b success');
        return new Promise((resolve, reject) => {
            ajax_promise('c.json', (res)=>{
                console.log(res);
                resolve();
            });
        })
}).then((res)=>{
   console.log('c success');
});

// 上面的代码中，每次在 return 一个 promise 的时候，只是 url 地址不一样，其他的代码是一样的。所以我们可以把重复的代码封装成函数。写法如下。
// 定义 ajax 请求：传入回调函数 success 和 fail
function ajax_promise_l(url, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            success && success(xmlhttp.responseText);
        } else {
            fail && fail(new Error('接口请求失败'));
        }
    };
}
// 第一步 model层，接口封装
function getPromise(url) {
    return new Promise((resolve, reject) => {
       ajax_promise_l(url, (res) => {
           // 这里的 res 是接口的返回结果。返回码 retCode 是动态数据。
          if (res.retCode == 0) {
              // 接口请求成功时调用
              resolve('request success' + res);
          } else {
              // 接口请求异常时调用
              reject({ retCode: -1, msg: 'network error' });
          }
       });
    });
}
// 第二步 业务层的接口调用 这里的 data 就是 从 resolve 和 reject 传过来的，也就是从接口拿到的数据
getPromise('a.json')
.then((res) => {
    // a 请求成功 从resolve获取正常结果：接口请求成功后，打印a接口的返回结果
    console.log(res);
    return getPromise('b.json');
})
.then((res) => {
    // b 请求成功
    console.log(res);
    return getPromise('c.json');
})
.then((res) => {
    // c 请求成功
    console.log(res);
})
.catch((e) => {
    // 从reject 返回异常信息
    console.log(e);
});

// 在做三次嵌套请求的时候，针对 resolve 和 reject 的处理时机是一样的。如果你的业务是针对**同一个接口**连续做了三次调用，只是请求**传参不同**，那么，按上面这样写是没有问题的。
// 如果是需要嵌套请求多个不同的接口，要处理的resolve和reject的时机和逻辑往往需要分开封装不同的 Promise 实例。
// Promise 链式调用 （封装多个接口）
// 封装 ajax 请求：传入回调函数 success 和 fail
function ajax_promise_n(url, success, fail) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            success && success(xmlhttp.responseText);
        } else {
            fail && fail(new Error('接口请求失败'));
        }
    };
}
// Promise 封装接口1
function request1() {
    return new Promise((resolve, reject) => {
       ajax_promise_n("https://www.baidu.com", (res) => {
           if (res.retCode == 200) {
               // 接口请求成功时调用：这里的 res 是接口1的返回结果
               resolve('request1 success' + res);
           } else {
               reject('request1 fail');
           }
       });
    });
}
// Promise 封装接口2
function request2() {
    return new Promise((resolve, reject) => {
        ajax_promise_n("https://www.jd.com", (res) => {
            if (res.retCode == 200) {
                // 接口请求成功时调用：这里的 res 是接口2的返回结果
                resolve('request2 success' + res);
            } else {
                reject('request2 fail');
            }
        });
    });
}
// Promise 封装接口3
function request3() {
    return new Promise((resolve, reject) => {
        ajax_promise_n("https://www.test.com", (res) => {
            if (res.retCode == 200) {
                // 接口请求成功时调用：这里的 res 是接口3的返回结果
                resolve('request3 success' + res);
            } else {
                reject('request3 fail');
            }
        });
    });
}
// 先调用request1，等resolve后再发起request2；等request2有了resolve后再发起request3；
request1()
    .then((res1) => {
        // 接口1请求成功
        console.log(res1);
        return request2();
    })
    .then((res2) => {
        // 接口2请求成功
        console.log(res2);
        return request3();
    })
    .then((res3) => {
        // 接口3请求成功
        console.log(res3);
    })
    .catch((err) => {
        // 从 reject中获取异常结果
        console.log(err);
    });

// 封装 Node.js 的回调方法
// 传统写法
fs.readFile(A, 'utf-8', function (err, data) {
    fs.readFile(B, 'utf-8', function (err, data) {
        fs.readFile(C, 'utf-8', function (err, data) {
            fs.readFile(D, 'utf-8', function (err, data) {
                console.log('qianguyihao:' + data);
            });
        });
    });
});

// promise 写法
function read(url) {
    return new Promise((resolve,reject) => {
        fs.readFile(url, 'utf8', (err,data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
read(A)
    .then((data) => {
        return read(B);
    })
    .then((data) => {
        return read(C);
    })
    .then((data) => {
        return read(D);
    })
    .then((data) => {
        console.log('qianguyihao:' + data);
    })
    .catch((err) => {
        console.log(err);
    });

// 链式调用 如何处理 reject 失败状态
// （1）不处理 reject
getPromise('a.json')
    .then(
        (res) => {
            console.log(res);
            return getPromise('b.json');
        },
        (err) => {
            // a request fail
            console.log('a err');
        }
    )
    .then((res) => {
        // b request success
        console.log(res);
        return getPromise('c.json'); // 继续请求c
    })
    .then((res) => {
        // c request success
        console.log('c success');
    });
/*打印结果 假设a请求失败，后面的代码会怎么走
a err
undefined
c success
// 虽然a请求失败，但后续的请求仍会执行
为什么第二行打印的是 undefined，因为啊请求走到 reject 之后，我们并没有做任何处理，这就导致，代码走到第二个 `then`的时候，**其实是在执行一个空的 promise**。
 */

//（2）单独处理 reject
getPromise('a.json')
    .then(
        (res) => {
            console.log(res);
            return getPromise('b.json');
        },
        (err) => {
            // a request fail
            console.log('a err');
            // 【重要】即使 a 请求失败，也依然继续执行 b请求
            return getPromise('b.json');
        }
    )
    .then((res) => {
        // b request success
        console.log(res);
        return getPromise('c.json'); // 继续请求c
    })
    .then((res) => {
        // c request success
        console.log('c success');
    });
// 跟例 1 相比，例 2 在 reject 中增加了一行`return getPromise('b.json')`，意味着，即使 a 请求失败，也要继续执行 b。
// 这段代码，我们是单独处理了 a 请求失败的情况。

// 统一处理 reject --- 在最后面写一个 catch。
getPromise('a.json')
    .then((res) => {
        console.log(res);
        return getPromise('b.json'); // 继续请求 b
    })
    .then((res) => {
        // b 请求成功
        console.log(res);
        return getPromise('c.json'); // 继续请求 c
    })
    .then((res) => {
        // c 请求成功
        console.log('c：success');
    })
    .catch((err) => {
        // 统一处理请求失败
        console.log(err);
    });
// 由于是统一处理多个请求的异常，所以**只要有一个请求失败了，就会马上走到 catch**，剩下的请求就不会继续执行了。比如说：
// -   a 请求失败：然后会走到 catch，不执行 b 和 c
// -   a 请求成功，b 请求失败：然后会走到 catch，不执行 c。


// return 返回值
// return后面的返回值，有两种情况：
// （1）返回 Promise 实例对象，返回的该实例对象会调用下一个 then
// （2）返回普通值，返回的普通值会直接传递给下一个 then，通过 then 参数中函数的参数接收该值

// 返回 Promise 实例对象
getPromise('a.json')
    .then((res) => {
        // a request success,从resolve获取正常结果：接口请求成功后，打印a接口的返回结果
        console.log(res);
        // return 返回 Promise 实例对象
        return new Promise((resolve,reject) => {
            resolve('tomtao');
        });
    })
    .then((res) => {
        console.log(res);
    });

// 返回普通值
getPromise('a.json')
    .then((res) => {
        // a request success,从resolve获取正常结果：接口请求成功后，打印a接口的返回结果
        console.log(res);
        // 返回普通值
        return 'otmtao';
    })
    /*
        既然上方代码并没有返回 promise，那么，这里的 then 是谁来调用呢？
        答案是：这里会产生一个新的 默认的 promise实例，来调用这里的then，确保可以继续进行链式操作。
    */
    .then((res2) => {
        // 这里的 res2 接收的是 普通值 'otmtao'
        console.log(res2);
    })