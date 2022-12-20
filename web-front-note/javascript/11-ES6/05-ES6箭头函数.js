// 箭头函数
// (参数1，参数2, 。。。) => { 函数体 }
// - 如果有且仅有 1 个形参，则`()`可以省略
// - 如果函数体内有且仅有 1 条语句，则`{}`可以省略，但前提是，这条语句必须是 return 语句。
// 需要强调的是，箭头函数是没有函数名的，既然如此，那要怎么调用箭头函数呢？你可以将箭头函数赋值给一个变量，通过变量名调用函数；也可以直接使用箭头函数。我们来看看下面的例子。

// （1）传统写法
function fn1(a,b) {
    console.log(a,b);
    return a+b;
}
console.log(fn1(1,2)); // 3

// （2）ES6箭头函数
const fn2 = (a,b) => {
    console.log(a,b);
    return a+b;
}
console.log(fn2(1,2)); // 3
// 在箭头函数中，如果方法体内只有一句话，且这句话是 return 语句，那就可以把 `{}`省略。写法如下：
const fn3 = (a,b) => a+b;
console.log(fn2(1,2)); // 3

// 在箭头函数中，如果形参只有一个参数，则可以把`()`省略。写法如下：
const fn4 = (a) => {
    console.log('haha');
    return a + 1;
};
console.log(fn2(1)); //输出结果：2

// 箭头函数的this指向
// ES6 之前的普通函数中：this 指向的是函数被调用的对象（也就是说，谁调用了函数，this 就指向谁）。
// 而 ES6 的箭头函数中：**箭头函数本身不绑定 this**，this 指向的是**箭头函数定义位置的 this**（也就是说，箭头函数在哪个位置定义的，this 就跟这个位置的 this 指向相同）。
const obj = {name:"tomtao626"};
function fn5() {
    console.log(this); // obj
    return () => {
        console.log(this); // obj
    };
}
const fn6 = fn5.call(obj);
fn6();
// 箭头函数是在 fn1()函数里面定义的，所以第二个 this 跟 第一个 this 指向的是**同一个位置**。又因为，在执行 `fn1.call(obj)`之后，第一个 this 就指向了 obj，所以第二个 this 也是指向 了 obj。

// 面试题：箭头函数的 this 指向
var name = 'zhangsan';
var objj = {
    name: 'lisi',
    sayHello: () => {
        console.log(this.name); // zhangsan
    },
};
objj.sayHello();
// 因为 `obj` 这个对象并不产生作用域， `sayHello()` 这个箭头函数实际仍然是定义在 window 当中的，所以 这里的 this 指向是 window。

// 参数默认值
// （1）传统写法
function fn8(param) {
    let p = param || 'hello';
    console.log(p);
}
// ，函数体内的写法是：如果 param 不存在，就用 `hello`字符串做兜底。这样写比较啰嗦。

// （2）ES6写法
function fn9(param='hello') {
    console.log(param);
}
// 在 ES6 中定义方法时，我们可以给方法里的参数加一个**默认值**（缺省值）：
// -   方法被调用时，如果没有给参数赋值，那就是用默认值；
// -   方法被调用时，如果给参数赋值了新的值，那就用新的值。

var fn10 = (a,b=5) => {
    console.log('haha');
    return a+b;
}
console.log(fn10(1)); // 6
console.log(fn10(1,2)); // 3

// 提醒 1：默认值的后面，不能再有**没有默认值的变量**。比如`(a,b,c)`这三个参数，如果我给 b 设置了默认值，那么就一定要给 c 设置默认值。
// 提醒 2：
let x = 'smyh';
function fn11(x, y = x) {
    console.log(x, y);
}
fn11('vae'); // vae vae

// 注意第二行代码，我们给 y 赋值为`x`，这里的`x`是括号里的第一个参数，并不是第一行代码里定义的`x`。打印结果：`vae vae`。
// 如果我把第一个参数改一下，改成：
let x = 'smyh';
function fn12(z, y = x) {
    console.log(z, y);
}
fn12('vae'); // vae smyh