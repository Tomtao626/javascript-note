// ES5 中，使用 `var` 定义变量（ var 是 variable 的简写）。
// ES6 中，新增了 let 和 const 来定义变量：
// -   `let`：定义**变量**，替代 var。
// -   `const`：定义**常量**（定义后，不可修改）。

var a1 = 1;
{
    var a1 = 2;
}

console.log(a1); //这里的 a1，指的是 区块 里的 a1
// 因为 var 是全局声明的，所以，即使是在区块里声明，但仍然在全局起作用。
// 使用 var 声明的变量不具备块级作用域特性
//上方代码的输出结果为 2 ，因为 var 是全局声明的。
//ES5语法中，用 var 定义的变量，容易造成全局污染（污染整个 js 的作用域）。如果不考虑浏览器的兼容性，我们在今后的实战中，**尽量避免**使用 var 定义变量，尽量用接下来要讲的ES6语法。

let a = 'hello'
console.log(a);
{
    let b = 'world';
}
console.log(b) // ReferenceError: b is not defined

var x = 2;
{
    let x = 3;
}
console.log(x); // 2
// 用块级作用域内， 用let 声明的变量，只在局部起作用

// let 可以防止数据污染，我们来看下面这个 **for 循环**的经典面试题。
// 1、用 var 声明变量：
for(var i=0;i<10;i++) {
    console.log('循环体中:' + i); // 1-9
}
console.log('循环体外:' + i); // 10
// 上方代码的最后一行可以正常打印结果，且最后一行的打印结果是 10。说明**循环体外**定义的变量 i，是**全局作用域**下的 i。

// 2、用 let 声明变量：
for(let j=0;j<10;j++) {
    console.log('循环体中:' + j); // 每循环一次，就会在 { } 所在的块级作用域中，重新定义一个新的变量 i
}
console.log('循环体外:' + j); // 会报错 因为用 let 定义的变量 i，只在`{ }`这个**块级作用域**里生效。
// 为了进一步强调 let 不会带来污染，需要说明的是：当我们定义了`let a = 1`时，如果我们在同一个作用域内继续定义`let a = 2`，是会报错的。

// const 定义常量
const name = 'tomato'; //定义常量
// 用 const 声明的常量，只在局部（块级作用域内）起作用；而且，用 const 声明常量时，必须赋值，否则报错。
// let 和 const的注意
/*
- 不属于顶层对象 Window
- 不允许重复声明
- 不存在变量提升
- 暂时性死区
- 支持块级作用域
- 相反， 用`var`声明的变量：存在变量提升、可以重复声明、**没有块级作用域**。
 */

// var/let/const 的共同点
/*
- 全局作用域中定义的变量，可以在函数中使用。
- 函数中声明的变量，只能在函数及其子函数中使用，外部无法使用。
 */

// 暂时性死区 DTC
// ES6 规定：使用 let/const 声明的变量，会使区块形成封闭的作用域。若在声明之前使用变量，就会报错。
// 也就是说，在使用 let/const 声明变量时，**变量需要先声明，再使用**（声明语句必须放在使用之前）。这在语法上，称为 “暂时性死区”（ temporal dead zone，简称 TDZ）。
// DTC 其实是一种保护机制，可以让我们养成良好的编程习惯。
const username = "tomtao626";
function func() {
    console.log(username);
    const username = 'hello'; // ReferenceError: Cannot access 'username' before initialization
}
func();

// ES5定义常量
Object.defineProperty(window, 'PI', {
    value:3.1415926,
    writable:false,
});
console.log(PI);
PI = 6777;
console.log(PI);
