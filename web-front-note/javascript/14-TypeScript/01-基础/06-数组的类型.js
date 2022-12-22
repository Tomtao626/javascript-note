// 数组的类型
// 类型+方括号 表示法
// let array: number[] = [1,2,3,4,5,6, 'p']; // 数组的项中不允许出现其他的类型：
var fib = [1, 1, 2, 3, 5];
console.log(fib); // [ 1, 1, 2, 3, 5 ]
console.log(typeof fib); // object
//fibonacci.push('8'); // 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制：
// push 方法只允许传入 number 类型的参数，但是却传了一个 "8" 类型的参数，所以报错了。这里 "8" 是一个字符串字面量类型
// 数组泛型
// 使用数组泛型（Array Generic） Array<elemType> 来表示数组：
var arrayData = [1, 2, 3, 4, 5, 6, 7];
console.log(arrayData); // [1, 2, 3, 4, 5, 6, 7]
console.log(typeof arrayData); // object
var numberArr = [1, 2, 3, 4, 5, 6, 78, 90];
console.log(numberArr); // [1, 2,  3,  4, 5, 6, 78, 90]
// NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
// 类数组
// 类数组（Array-like Object）不是数组类型，比如 arguments：
function sum() {
    // let args: number[] = arguments; // TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 15 more.
}
// 上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
function sum2() {
    var args = arguments;
    console.log(args); // [Arguments] {}
}
sum2();
// 除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。
// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
function sum3() {
    var args = arguments;
    console.log(args);
}
