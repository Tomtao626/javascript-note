// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i=0;i<length;i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'xxxx')); // [ 'xxxx', 'xxxx', 'xxxx' ]
// 上面这种写法并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
// 这时候，泛型就派上用场了：
function createArray2<T>(length:number, value:T):Array<T>{
    let result: T[] = [];
    for (let i=0;i<length;i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray2(3, 'xxxx')); // [ 'xxxx', 'xxxx', 'xxxx' ]
//在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
//接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来

// 多个类型参数
function swap<T,U>(tuple: [T,U]): [U,T] {
    return [tuple[1], tuple[0]];
}
console.log(swap([7, 'seven'])); // [ 'seven', 7 ]

// 泛型约束
// 在函数内部使用泛型变量时，由于事先不知道是哪种类型，所以不能随意操作它的属性和方法
function loggingIdentify<T>(arg: T): T{
    // console.log(arg.length); // 泛型 T 不一定包含属性 length，所以编译的时候报错了。
    return arg;
}
// 我们可以对泛型进行约束，只允许这个函数传入那些包含length属性的变量，这就是泛型约束。
interface LengthWise {
    length: number;
}
function loggingIdentify2<T extends LengthWise>(args: T): T {
    console.log(args.length);
    return args;
}
// 使用extends约束泛型T必须符合接口LengthWise的形式，也就是必须包含length属性；
// 如果调用loggingIdentify2的时候，传入的args不包含length，那么在编译阶段就会报错。
//loggingIdentify2(7); error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.

// 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
    for (let i in source) {
        target[i] = (<T>source)[i];
    }
    return target;
}
let x = {a:1,b:2,c:3,d:4};
copyFields(x, {b:10, c:70});
// 使用了两个类型参数，其中要求 T 继承 U，这样就保证了 U 上不会出现 T 中不存在的字段。

// 泛型接口
//使用接口的方式来定义一个函数需要符合的形式
interface SearchFunc {
    (source:string, subString:string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source:string, subString:string) {
    return source.search(subString) !== -1;
}
// 使用含有泛型的接口来定义函数的形式
interface CreateArrayFunc {
    <T>(length:number,value:T):Array<T>;
}
let createArrayData: CreateArrayFunc;
createArrayData = function<T>(length:number,value:T): Array<T> {
    let result: T[] = [];
    for (let i=0;i<length;i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArrayData(3, 'x')); // [ 'x', 'x', 'x' ]
// 也可以把反省参数提前到接口名上
interface CreateArrayFunc2<T> {
    <T>(length:number,value:T):Array<T>;
}
// 此时在使用泛型接口的时候，需要定义泛型的类型。
let createArrayData2: CreateArrayFunc2<any>;
createArrayData2 = function<T>(length:number,value:T): Array<T> {
    let result: T[] = [];
    for (let i=0;i<length;i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArrayData2(3, 'x')); // [ 'x', 'x', 'x' ]

// 泛型类
// 与泛型接口类似，泛型也可以用于类的类型定义中
class GenericNumber<T> {
    zeroVlaue: T;
    add:(x:T,y:T)=>T;
}
let genericNumber = new GenericNumber<number>();
genericNumber.zeroVlaue = 0;
genericNumber.add = function (x,y) {return x+y};

// 泛型参数的默认类型
//在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。
function createArraydata<T = string>(length:number, value:T): Array<T> {
    let result: T[] = [];
    for (let i=0;i<length;i++) {
        result[i] = value;
    }
    return result;
}
createArraydata(3, 'x')