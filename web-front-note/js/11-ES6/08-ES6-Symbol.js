// ES5中对象的属性名都是字符串，容易造成重名，污染环境。
// ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。
/*
Symbol属性对应的值是唯一的，解决命名冲突问题
Symbol值不能与其他数据进行计算，包括同字符串拼串
 */

// Symbol是函数 但并不是构造函数 创建一个Symbol数据类型
let mySymbol = Symbol();
console.log(mySymbol); // Symbol()
console.log(typeof mySymbol); // symbol

// 1、将Symbol作为对象的属性值
let mySymbol1 = Symbol();
let obj = {
  name: 'tomtao',
  age:18,
};
//obj.mySymbol = 'male'; //错误：不能用 . 这个符号给对象添加 Symbol 属性。
obj[mySymbol1] = 'hello'; // 正确：通过**属性选择器**给对象添加 Symbol 属性。后面的属性值随便写。
console.log(obj); // { name: 'tomtao', age: 18, [Symbol()]: 'hello' }

// 现在我们用for in尝试对上面的obj进行遍历：

let mySymbol2 = Symbol();

let obj1 = {
    name: 'smyhvae',
    age: 26
};
obj1[mySymbol] = 'hello';
console.log(obj1); // { name: 'smyhvae', age: 26, [Symbol()]: 'hello' }
//遍历obj
for (let i in obj1) {
    console.log(i); // name age
}
// for in、for of 遍历时不会遍历Symbol属性。
// 既然Symbol()是函数，函数就可以传入参数，我们可以通过参数的不同来作为**标识**。比如：
//在括号里加入参数，来标识不同的Symbol
let mySymbol3 = Symbol('one');
let mySymbol4 = Symbol('two');

console.log(mySymbol3 == mySymbol4); //打印结果：false
console.log(mySymbol3);         //打印结果：Symbol(one)
console.log(mySymbol4);         //打印结果：Symbol(two)。颜色为红色。
console.log(mySymbol4.toString());//打印结果：Symbol(two)。颜色为黑色。

// Symbol 定义常量
const MY_NAME = Symbol('my_name');
console.log(MY_NAME); // Symbol(my_name)

// 内置的 Symbol 值
// 除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。
// - `Symbol.iterator`属性
// 对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法。