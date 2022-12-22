// 内置对象
// 内置对象是指根据标准在全局作用域（Global）上存在的对象。

// ECMAScript 的内置对象
/*
Boolean、Error、Date、RegExp
 */
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// DOM和BOM的内置对象
/*
Document、HTMLElement、Event、NodeList
 */
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
    // Do something
});

// TypeScript 核心库的定义文件
// TypeScript 核心库的定义文件中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。
// 当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，
// 注意，TypeScript 核心库的定义中不包含 Node.js 部分。

// 用 TypeScript 写 Node.js§
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：
// npm install @types/node --save-dev