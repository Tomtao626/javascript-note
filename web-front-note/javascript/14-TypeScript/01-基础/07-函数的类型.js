// 定义函数的两种方式
// 函数声明
function sum(x, y) {
    return x + y;
}
console.log(sum(23, 34)); // 57
// 函数表达式
var mySum = function (x, y) {
    return x + y;
};
console.log(mySum(16, 15)); // 31
// 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
function sumFn(x, y) {
    return x + y;
}
console.log(sumFn(20, 90)); // 110
var mySumFn = function (x, y) {
    return x + y;
};
console.log(mySumFn(100, 89)); // 189
// 使用函数表达式 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
var mySumFn1 = function (x, y) {
    return x + y;
};
var searchfn;
searchfn = function (source, subString) {
    return source.search(subString) !== -1;
};
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。
// 可选参数
function buildName(firstName, lastName) {
    if (lastName) {
        return firstName + ' ' + lastName;
    }
    else {
        return firstName;
    }
}
var tomtao = buildName('tom', 'tao');
var tom = buildName('Tom');
console.log(tom, tomtao); // Tom  tom tao
// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：
// 参数默认值
function buildName1(firstName, lastName) {
    if (lastName === void 0) { lastName = 'cat'; }
    return firstName + ' ' + lastName;
}
var tomcat = buildName1('john');
console.log(tomcat);
