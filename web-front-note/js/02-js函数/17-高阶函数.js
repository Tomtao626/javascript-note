// 高阶函数
// 当函数A接收函数B作为参数，或者把函数C作为返回值输出时，那么函数A就是高阶函数
// 通俗来说，高阶函数是 对其他函数进行操作 的函数。

// 把其他函数作为参数
function fn1(a,b,callback) {
    console.log(a + b);
    // 执行完上面的 console.log() 语句之后，再执行下面这个 callback 函数。也就是说，这个 callback 函数是最后执行的。
    callback && callback();
}
fn1(10,20, function () {
   console.log('我是最后执行的函数');
});

// 把其他函数当作返回值
function fn2() {
    let a = 20;
    return function () {
        console.log(a);
    };
}
const foo = fn2();
foo();