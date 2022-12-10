// 创建自定义对象的几种方法
// 方式一：对象字面量 {}内的属性和方法是键值对 键是属性名 值是属性值，可以是任意类型的值（数字类型/字符串类型/布尔类型/函数类型等）
// 创建对象
var obj = {};
// 创建一个简单的对象
const obj1 = {
    name: '张三',
    age: 18,
};
// 创建一个复杂的对象
const obj2 = {
    name: '张三',
    age: 18,
    isGirl: false,
    test: {
        id:123,
        tel:10086,
    },
    sayName: function (a) {
        console.log(this.name, a); // 张三 119
    },
};
console.log(JSON.stringify(obj2)); // {"name":"张三","age":18,"isGirl":false,"test":{"id":123,"tel":10086}}
obj2.sayName(119);
// 对象字面量的属性名可以加引号也可以不加，建议不加。如果要使用一些特殊的名字，则必须加引号。
// 属性名和属性值是一组一组的键值对结构，键和值之间使用`:`连接，多个值对之间使用`,`隔开。

// 方式二：工厂模式 new Object()  批量创建对象
/*
* 使用工厂方法创建对象 == new Object()
* 通过该方法可以大批量创建对象
 */
function createPerson(name, age, gender) {
    // 创建一个新的对象
    var obj = new Object();
    // 向对象添加属性
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    obj.sayName = function () {
      console.log(this.name);
    };
    // 将新的对象返回
    return obj;
}

var obj3 = createPerson('张三', 18, '男');
var obj4 = createPerson('赵四', 38, '男');
var obj5 = createPerson('灭绝师太', 1, '女');
console.log(obj3); // { name: '张三', age: 18, gender: '男', sayName: [Function (anonymous)] }
console.log(obj4); // { name: '赵四', age: 38, gender: '男', sayName: [Function (anonymous)] }
console.log(obj5); // { name: '灭绝师太', age: 1, gender: '女', sayName: [Function (anonymous)] }

var obj6 = new Object();
obj6.name = '猪八戒';
obj6.age = 28;
obj6.gender = '男';
obj6.sayHi = function () {
    console.log('hello world');
};
console.log(obj6.sayHi()); // hello world
// 工厂模式的弊端 --- 使用工厂方法创建的对象，使用的构造函数都是Object。所以创建的对象都是Object这个类型，导致无法区分出多种不同类型的对象

// 方式三：利用构造函数
// 利用构造函数自定义对象
var stu1 = new Student('tomtao626');
console.log(stu1);
stu1.sayHi();

var stu2 = new Student('tttt');
console.log(stu2);
stu2.sayHi();

// 创建一个构造函数
function Student(name) {
    this.name = name;
    this.sayHi = function () {
        console.log(this.name + '6666');
    };
}

// 构造函数
// 创建一个构造函数
function Person(name,age,gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = function () {
      console.log(this.name);
    };
}

var per1 = Person('孙悟空', 18, '男');
var per2 = new Person('玉兔精', 16, '女');
var per3 = new Person('奔波霸', 38, '男');
console.log(per1);
console.log(per2);
console.log(per3);

// 创建一个构造函数，专门用来创建Dog对象
function Dog() {}
var dog = new Dog();
console.log(dog); // Dog {}

/*构造函数
（1）概念
    构造函数：是一种特殊的函数，主要用来创建和初始化对象，也就是为对象的成员变量赋初始值。它与 `new` 一起使用才有意义。
    我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个构造函数里面。
（2）和普通函数的区别
    构造函数习惯上首字母大写
    调用方式不同：普通函数是直接调用，而构造函数需要使用 new 关键字来使用
    this 指向也不同：
        1.以函数的形式调用时，this 永远都是window。比如func(); 相当于 window.func();
        2.以方法的形式调用，this 是调用方法的那个对象
        3.以构造函数的形式调用时，this 是新创建的实例对象
    new 一个构造函数的执行流程：
        1.开辟内存空间，在内存中创建一个新的空对象
        2.让 this 指向这个新的对象
        3.执行构造函数里面的代码，给这个新对象添加属性和方法
        4.返回这个新对象（所有构造函数里面不需要 return）
    因为 this 指向的是 new 一个 Object 之后的实例对象。
 */
function createStudent(name) {
    var student = new Object();
    student.name = name; // //第一个name指的是student对象定义的变量。第二个name指的是createStudent函数的参数。二者不一样
}
const stuOne = createPerson('刘备');
console.log(stuOne.name); // 刘备
// 可以改进为：
function Students(name) {
    this.name = name; //this指的是构造函数中的对象实例
    console.log(this.name); // 曹操
}
const stuTwo = Students('曹操');
console.log(stuTwo); // undefined

// 静态成员和实例成员
/*
静态成员：在构造函数本身添加的成员，只能通过构造函数本身访问
实例成员：在构造函数内部创建的对象成员，只能通过实例化的对象来访问
 */

// 实例
/*
使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类。
通过一个构造函数创建的对象，称为该类的实例。
 */

// instanceof --- 检查一个对象是否为类的实例 如果是，则返回 true；否则返回 false。
function Person1() {}
function Dog1() {}
var person1 = new Person1();
var dog1 = new Dog1();
console.log(person1 instanceof Person1); // true
console.log(dog1 instanceof Person1); // false
console.log(dog1 instanceof Object); // true 所有的对象都是Object的后代。因此，打印结果为：true
// 所有的对象都是 Object 的后代，因此 `任何对象 instanceof Object` 的返回结果都是 true

// json 遍历
var myJson = {
    "name": "tomtao626",
    "aaa": 111,
    "bbb": 222,
};
// json 遍历 for...in...
for (var key in myJson) {
    console.log(key); // 获取键
    console.log(myJson[key]); // 获取 值（第二种属性绑定和获取值的方法）
    console.log('------');
}





















