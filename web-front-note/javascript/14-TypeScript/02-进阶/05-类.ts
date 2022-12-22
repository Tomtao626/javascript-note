// 类的概念

/*
- 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
 */

// 属性和方法
// 使用class定义类 使用constructor定义构造函数
class Animal {
    public name;
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('tom');
console.log(a.sayHello()); // My name is tom

// 类的继承
// 使用extends实现继承，子类中使用super关键字来调用父类的构造函数和方法
class Cat extends Animal{
    constructor(name) {
        super(name); // 调用父类的constructor(name);
        console.log(this.name);
    }
    sayHello(): string {
        return super.sayHello(); // 调用父类的sayHello()
    }
}
let c = new Cat('tom'); // tom
console.log(c.sayHello()); // My name is tom

// 存取器
// 使用getter和setter可以改变属性的赋值和取值行为
class Animals {
    constructor(name) {
        this.name = name;
    }
    get name() {
        return 'Jack';
    }
    set name(value) {
        console.log('setter: ' + value);
    }
}

let aa = new Animals('Kitty'); // setter: Kitty
aa.name = 'Tom'; // setter: Tom
console.log(aa.name); // Jack

// 静态方法
// 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：
class StaticFn {
    static isStaticFn(a) {
        return a instanceof StaticFn;
    }
}
let s = new StaticFn();
StaticFn.isStaticFn(s);
// s.isStaticFn(s); // // TypeError: s.isStaticFn is not a function

// ES7中类的用法
// 实例属性
// ES6中实例的属性只能通过this.xxx来定义，ES7可以直接在类中定义
class Student {
    name = 'jsck';
}
let ss = new Student();
console.log(ss.name);

// 静态属性
// 使用static定义一个静态属性
class TestFn {
    static age = 18;
    constructor() {
    }
}
console.log(TestFn.age);

// typescript中类的用法
// public private protected 三种访问修饰符
/*
public     修饰公有属性和方法 可以在任何地方被访问到 默认所有的属性和方法都是public
private    修饰私有属性和方法 不能在声明它的类的外部访问
protected  修饰受保护的属性和方法，和private类似，区别是它允许在子类中被访问
*/
class AnimalPublic {
    public name;
    public constructor(name) {
        this.name = name;
    }
}
let aPublic = new AnimalPublic('jack');
console.log(aPublic.name);
aPublic.name = 'alice';
console.log(aPublic.name);
//上面的例子中，name 被设置为了 public，所以直接访问实例的 name 属性是允许的。

//很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了：
class AnimalPrivate {
    private name;
    public constructor(name) {
        this.name = name;
    }
}
let aPrivate = new AnimalPublic('jack');
console.log(aPrivate.name);
aPrivate.name = 'alice';
console.log(aPrivate.name);
// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
//TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性。

//上面的例子编译后的代码是：

var AnimalP = (function () {
    function AnimalP(name) {
        this.name = name;
    }
    return AnimalP;
})();
var aP = new Animal('Jack');
console.log(aP.name);
aP.name = 'Tom';
//使用 private 修饰的属性或方法，在子类中也是不允许访问的：

class AnimalPs {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

class Cats extends AnimalPs {
    constructor(name) {
        super(name);
        //        console.log(this.name); // index.ts(11,17): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
    }
}

// 如果是用 protected 修饰，则允许在子类中访问：
class AniamlProte {
    protected name;
    public constructor(name) {
        this.name = name;
    }
}
class Catss extends AniamlProte {
    constructor(name) {
        super(name);
    }
}

// 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
class Animal2 {
    public name;
    private constructor(name) {
        this.name = name;
    }
}
class Cat2 extends Animal {
    constructor(name) {
        super(name);
    }
}

let a2 = new Animal('Jack');

// index.ts(7,19): TS2675: Cannot extend a class 'Animal2'. Class constructor is marked as private.
// index.ts(13,9): TS2673: Constructor of class 'Animal2' is private and only accessible within the class declaration.

//当构造函数修饰为 protected 时，该类只允许被继承：
class Animal3 {
    public name;
    protected constructor(name) {
        this.name = name;
    }
}
class Cat3 extends Animal {
    constructor(name) {
        super(name);
    }
}

let a3 = new Animal('Jack');

// index.ts(13,9): TS2674: Constructor of class 'Animal3' is protected and only accessible within the class declaration.

// 参数属性
// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
class Animal4 {
    // public name: string;
    public constructor(public name) {
        // this.name = name;
    }
}
// readonly
// 只读属性关键字 只允许出现在 属性声明 索引签名 构造函数中
class Animal5{
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a5 = new Animal5('jack');
console.log(a5.name);
//a5.name = 'cdsa'; // TS2540: Cannot assign to 'name' because it is a read-only property.

// 抽象类
// abstract 用于定义抽象类和其中的抽象方法。
// 抽象类不允许被实例化
abstract class Animal6 {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHello();
}
//let a6 = new Animal6('alice'); // error TS2511: Cannot create an instance of the abstract class 'Animal'.
// 定义了一个抽象类 Animal，并且定义了一个抽象方法 sayHi。在实例化抽象类的时候报错了。

// 抽象类中的抽象方法必须被子类实现
abstract class Animal7 {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat7 extends Animal {
    public eat() {
        console.log(`${this.name} is eating.`);
    }
}

let cat7 = new Cat('Tom');
// error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
//定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi，所以编译报错了。

// 正确写法
abstract class Animal8 {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat8 extends Animal {
    public sayHi() {
        console.log(`Meow, My name is ${this.name}`);
    }
}

let cat8 = new Cat('Tom');
// 实现了抽象方法 sayHi，编译通过了

// 需要注意的是，即使是抽象方法，TypeScript 的编译结果中，仍然会存在这个类，上面的代码的编译结果是：
var __extends =
  (this && this.__extends) ||
  function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() {
        this.constructor = d;
    }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
};
var Animal9 = (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
})();
var Cat9 = (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        _super.apply(this, arguments);
    }
    Cat.prototype.sayHi = function () {
        console.log('Meow, My name is ' + this.name);
    };
    return Cat;
})(Animal);
var cat9 = new Cat('Tom');

//类的类型
//给类加上 TypeScript 的类型很简单，与接口类似：

class Animal10 {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
        return `My name is ${this.name}`;
    }
}

let a10: Animal10 = new Animal10('Jack');
console.log(a10.sayHi()); // My name is Jack