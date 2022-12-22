// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
function createArray(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'xxxx')); // [ 'xxxx', 'xxxx', 'xxxx' ]
// 上面这种写法并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
// 这时候，泛型就派上用场了：
function createArray2(length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray2(3, 'xxxx')); // [ 'xxxx', 'xxxx', 'xxxx' ]
//在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
//接着在调用的时候，可以指定它具体的类型为 string。当然，也可以不手动指定，而让类型推论自动推算出来
// 多个类型参数
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
console.log(swap([7, 'seven'])); // [ 'seven', 7 ]
// 泛型约束
// 在函数内部使用泛型变量时，由于事先不知道是哪种类型，所以不能随意操作它的属性和方法
function loggingIdentify(arg) {
    // console.log(arg.length); // 泛型 T 不一定包含属性 length，所以编译的时候报错了。
    return arg;
}
function loggingIdentify2(args) {
    console.log(args.length);
    return args;
}
// 使用extends约束泛型T必须符合接口LengthWise的形式，也就是必须包含length属性；
// 如果调用loggingIdentify2的时候，传入的args不包含length，那么在编译阶段就会报错。
//loggingIdentify2(7); error TS2345: Argument of type '7' is not assignable to parameter of type 'Lengthwise'.
// 多个类型参数之间也可以互相约束
function copyFields(target, source) {
    for (var i in source) {
        target[i] = source[i];
    }
    return target;
}
var x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, c: 70 });
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
var createArrayData;
createArrayData = function (length, value) {
    var result = [];
    for (var i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
};
console.log(createArrayData(3, 'x'));
