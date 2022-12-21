// JavaScript的数据类型主要分为原始数据类型和对象类型。

// 原始数据类型

// 布尔值
let isDone: boolean = false;
console.log(isDone);
// 使用构造函数创建的对象不是布尔值
let createNewByBoolean = new Boolean(1);
console.log(createNewByBoolean); // [Boolean: true]
console.log(typeof createNewByBoolean); // object
// 实际上 new Boolean(1) 返回的是一个Boolean对象，直接调用Boolean(1)也可以返回一个boolean类型
let createByBoolean = Boolean(1);
console.log(createByBoolean); // true
console.log(typeof createByBoolean); // boolean
// boolean是基本类型，Boolean是构造函数

// 数值
// 使用number定义数值类型
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// 二进制
let binaryLiteral: number = 0b1010;
// 八进制
let octalLiteral: number = 0o744;
let notAnumber: number = null;
let infinityNumber: number = Infinity;
console.log(decLiteral);
console.log(hexLiteral);
console.log(binaryLiteral);
console.log(octalLiteral);
console.log(notAnumber);
console.log(infinityNumber);

// 字符串
// 使用string定义字符串类型
let myAge: number = 18;
let myName: string = "张三";
console.log(myAge);
console.log(myName);
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
console.log(sentence);

// 空值
//JavaScript没有空值(void)的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：
function nmsl(): void{
    console.log('nmsl');
}
nmsl();
//声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null（只在 --strictNullChecks 未指定时）
let unusable: void = undefined;
let unusablel: void = null;
console.log(unusable, unusablel);

// Null和Undefined
//使用 null 和 undefined 来定义这两个原始数据类型
let u: undefined = undefined;
let n: null = null;
console.log(u,n);
//与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错
let num1: number = undefined;
// 这样也不会报错
let u1: undefined;
let num2: number = u;
//而 void 类型的变量不能赋值给 number 类型的变量：

let u2: void;
let num: number = u;

// Type 'void' is not assignable to type 'number'.