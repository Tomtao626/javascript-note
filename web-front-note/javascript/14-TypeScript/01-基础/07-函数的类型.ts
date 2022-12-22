// 定义函数的两种方式
// 函数声明
function sum(x, y) {
    return x + y;
}

console.log(sum(23, 34)); // 57

// 函数表达式
let mySum = function (x, y) {
    return x + y;
}
console.log(mySum(16, 15)); // 31

// 一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到，其中函数声明的类型定义较简单：
function sumFn(x: number, y: number): number {
    return x + y;
}

console.log(sumFn(20, 90)); // 110

let mySumFn = function (x: number, y:number): number {
    return x + y;
}
console.log(mySumFn(100, 89)); // 189
// 使用函数表达式 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 mySum 添加类型，则应该是这样：
let mySumFn1: (x:number, y:number) => number =function (x:number, y:number): number {
    return x + y;
}
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
// 在 ES6 中，=> 叫做箭头函数，应用十分广泛

// 用接口定义函数的形式
// 使用接口来定义一个函数需要的形式
interface SearchFunc {
    (source: string, subString: string): boolean;
}
let searchfn: SearchFunc;
searchfn = function (source:string, subString:string){
    return source.search(subString) !== -1;
}
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

// 可选参数
function buildName(firstName: string, lastName?:string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomtao = buildName('tom', 'tao');
let tom = buildName('Tom');
console.log(tom, tomtao); // Tom  tom tao
// 可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了：

// 参数默认值
function buildName1(firstName: string, lastName: string = 'cat') {
    return firstName + ' ' + lastName;
}
let tomcat = buildName1('john');
console.log(tomcat); // john cat
// 不受可选参数必须接在必需参数后面」的限制

// 剩余参数
// ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：注意，rest 参数只能是最后一个参数
function push(array, ...items) {
    items.forEach(function (item){
       array.push(item);
    });
}
let a: any[] = [];
push(a, 12345,6,9,8);
console.log(a);
// 事实上， items是一个数组，可以用数组的类型来定义
function push2(array: any[], ...items: any[]){
    items.forEach(function (item){
        array.push(item);
    });
}
let b: any[] = [];
push2(b, 12345,6,9,8);
console.log(b);

// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
// 利用联合类型，我们可以这么实现：
function reverse1(x: number|string): number|string|void {
    if (typeof x === "number") {
        return Number(x.toString().split('').reverse().join(''));
    }else if (typeof x === "string") {
        return x.split('').reverse().join();
    }
}
// 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
// 这时，我们可以使用重载定义多个 reverse 的函数类型：
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
