// 构造函数 --- 任何一个函数都可以被new，new之后，就成了构造方法
function Foo(name, age) {
    this.name = name;
    this.age = age;
    //retrun this;   //默认有这一行。new一个构造函数，返回一个对象
}
var fn1 = new Foo('tomtao626', 18);
var fn2 = new Foo('tomtao627', 20); //new 多个实例对象、
/*与普通函数相比，构造函数有以下明显特点：
- 用 new 关键字调用。
- 不需要用 return 显式返回值的，默认会返回 this，也就是新的实例对象。
- 建议函数名的首字母大写，与普通函数区分开。
当 new 之后，this 会先变成一个空对象，然后通过`this.name = name`来赋值。
 */

// 构造函数-扩展
var a = {} // 其实是var a = new Object()的语法糖
var b = [] // 其实是var a = new Array()的语法糖
// function Foo(){...} 其实是var Foo = new Function(...)
// instanceof 判断一个函数是否是一个变量的构造函数
// 数组、对象、函数也有构造函数，它们的构造函数是 Array、Object、function。实际开发中，都推荐前面的书写方式。

// 原型规则和示例
/*
（1）所有的引用类型（数组、对象、函数），都具有对象特性，都可以**自由扩展属性**。null 除外。
    http://img.smyhvae.com/20180306_1651.png
（2）所有的**引用类型**（数组、对象、函数），都有一个`_proto_`属性，属性值是一个**普通的对象**。`_proto_`的含义是隐式原型。
    http://img.smyhvae.com/20180306_1656.png
（3）所有的**函数**（不包括数组、对象），都有一个`prototype`属性，属性值是一个**普通的对象**。`prototype`的含义是**显式原型**。（实例没有这个属性）
    http://img.smyhvae.com/20180306_1659.png
（4）所有的**引用类型**（数组、对象、函数），`_proto_`属性指向它的**构造函数**的`prototype`值。
    http://img.smyhvae.com/20180306_1701.png
（5）当试图获取一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的`_proto_`中寻找（即它的构造函数的`prototype`）。
 */
function Foo1(name) {
    this.name = name;
}

Foo1.prototype.alertName = function () {
    // 既然 Foo1.prototype 是普通的对象，那也允许给它添加额外的属性 alertName
    console.log(this.name);
};

var fn = new Foo1('smyhvae');
fn.printName = function () {
    console.log(this.name);
};

// 测试
fn.printName(); //输出结果：smyhvae
fn.alertName(); //输出结果：smyhvae
// 上方代码中，虽然 alertName 不是 fn 自身的属性，但是会从它的构造函数的`prototype`里面找。

// 遍历循环对象自身的属性
// 我们知道，`for in`循环可以遍历对象。针对上面的那个 fn 对象，它自身有两个属性：`name`、`printName`，另外从原型中找到了第三个属性`alertName`。现在，如果我们对 fn 进行遍历，能遍历到两个属性还是三个属性呢？
// 答案：两个。因为，**高级浏览器中已经在 `for in`循环中屏蔽了来自原型的属性。但是，为了保证代码的健壮性，我们最好自己加上判断**，手动将第三个属性屏蔽掉：

for (var item in fn) {
    if (fn.hasOwnProperty(item)) {
        console.log(item);
    }
}

// 原型链
console.log('----------------')
var obj = {}; obj.a = 100;
var arr = []; arr.a = 100;
function func() {}
func.a = 100
console.log(obj.__proto__); // [Object: null prototype] {}
console.log(arr.__proto__); // Object(0) []
console.log(func.__proto__); // {}
console.log(func.prototype); // {}
console.log(obj.__proto__ == Object.prototype); // true
func.toString(); //去 fn._proto_._proto_ 中查找 toString()方法
// func 直接调用了 toString()方法，这是因为它通过**原型链**，去`_proto_`的`_proto_`里找到了`Object`，而`Object`是由`toString()`方法的。

// instanceof --- 用于判断引用类型属于哪个构造函数
// 判断是一个变量是否为数组 --- 变量 instanceof Array
var array = [1,2,'dds'];
console.log(array instanceof Array); // true

function Person() {}
// p--->Person.prototype--->Object.prototype--->null
var p = new Person();
//构造函数的原型是否在 p 对象的原型链上！
console.log(p instanceof Person); // true

// fn 的`_proto_`一层一层往上找，看能否对应到 Foo1.prototype
console.log(fn instanceof Foo1); // true
// fn ---> Foo1.prototype(Foo1) ---> Object.prototype(Object) ---> null
// 注意，Object 这个构造方法的显式原型是 null，这是一个特例。
// 通过原型链查找时，如果你找的是一个属性的话，则返回 undefined，如果你找的是一个方法，则报错。

// 如何准确判断一个变量是数组类型
var arr1 = [];
console.log(arr1 instanceof Array); //true
console.log(typeof arr1); // Object 提示：typeof 方法无法判断是否为数组
// 只能通过 instanceof 来判断是否为数组。而 typeof 的打印结果是 object。

// 写一个原型链继承的例子
function DomElement(id) {
    this.dom = document.getElementById(id);
}
DomElement.prototype.html = function (val) {
    var ele = this.dom;
    if (val) {
        ele.innerHTML = val;
        return this;
    } else {
        return ele.innerHTML;
    }
};
DomElement.prototype.on = function (type, fn) {
    var ele = this.dom;
    ele.addEventListener(type, fn);
    return this;
};
var div1 = new DomElement('div1');
div1.html('<p>这是一段文字</p >');
div1.on('click', function () {
    console.log('clicked');
});

// 描述 new 一个对象的过程
/*
（1）创建一个新对象
（2）this 指向这个新对象
（3）执行代码（对 this 赋值）
（4）返回 this
 */