// 原型对象
// 原型的引入
function Person(name,age,gender) {
    this.name = name;
    this.age=age;
    this.gender = gender;
    // 向对象中添加一个方法
    this.sayName = function () {
        console.log('你好, ' + this.name);
    }
}
// 创建一个Person的实例
var per = new Person("孙悟空",18,"男");
var per2 = new Person("猪八戒",18,"男");
per.sayName();
per2.sayName();
console.log(per.sayName == per2.sayName); // false
// sayName方法是写在构造函数Person内部的，然后在两个不同的实例中进行了调用。
// 构造函数每执行一次，就会给每个实例创建一个新的 sayName 方法。也就是说，每个实例的sayName都是唯一的。
// 按照以上的写法，假设创建10000个实例对象，就会创建10000个 sayName 方法，这显然是不合适的。为什么不能让所有的对象共享一个方法呢。
// 还有一种方式是，将sayName方法在全局作用域中定义：（不建议。原因看注释）
function PersonGlobal(name,age,gender) {
    this.name = name;
    this.age=age;
    this.gender = gender;
    // 向对象中添加一个方法
    this.sayName = fun;
}
/*
将 sayName 方法在全局作用域中定义
（1）将函数定义在全局作用域中，污染了全局作用域的命名空间
（2）定义在全局作用域中不安全
 */
function fun() {
    console.log('你好, ' + this.name);
}
// 创建一个PersonGlobal的实例
var per3 = new PersonGlobal("孙悟空",18,"男");
var per4 = new PersonGlobal("猪八戒",18,"男");
per3.sayName();
per4.sayName();
console.log(per3.sayName == per4.sayName); // true  共享全局作用域

// 比较好的方式是，在原型中添加 sayName 方法
function PersonPrototype(name,age,gender) {
    this.name = name;
    this.age=age;
    this.gender = gender;
}
// 在原型中添加 sayName 方法
PersonPrototype.prototype.sayName = function (){
    console.log('你好, ' + this.name);
}
var per5 = new PersonPrototype("孙悟空",18,"男");
var per6 = new PersonPrototype("猪八戒",18,"男");
per5.sayName();
per6.sayName();
console.log(per5.sayName == per6.sayName); // true

/* 原型
原型prototype概念：
（1）认识1
    所创建的每一个函数，解析器都会向函数中添加一个属性 prototype。这个属性对应着一个对象，这个对象就是所谓的原型对象。
    如果函数作为普通函数调用prototype没有任何作用，当函数以构造函数的形式调用时，它所创建的实例对象中都会有一个隐含的属性，可以通过__proto__来访问该属性
 */
function Person11() {}
var per11 = new Person11();
var per22 = new Person11();
console.log(Person11.prototype); // {}
console.log(per11.__proto__ == Person11.prototype); // true
console.log(per22.__proto__ == Person11.prototype); // true
// 打印结果表明 实例.__proto__ 和构造函数.prototype 都指向的是原型对象

/*
（2）认识2
    原型对象相当于一个公共的区域，所有同一个类的实例都可以访问到这个原型对象，可以将对象中共有的内容，统一设置到原型对象中。
    后面当创建构造函数时，可以将这些对象共有的属性和方法，统一添加到构造函数的原型对象中，这样就不用分别为每一个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了。
（3）认识3
    使用 in 检查对象中是否含有某个属性时，如果对象中没有但是原型中有，也会返回true
    可以使用对象的 hasOwnProperty() 来检查对象自身中是否含有该属性
 */

/*原型链
原型对象也是对象，所以它也有原型，当我们使用或访问一个对象的属性或方法时：
- 它会先在对象自身中查找，如果有则直接使用；
- 如果没有则会去原型对象中寻找，如果找到则直接使用；
- 如果没有则去原型的原型中寻找，直到找到Object对象的原型
- Object对象的原型没有原型，如果在Object原型中依然没有找到，则返回null
 */

// 对象的 toString() 方法
function Person22(name,age,gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
var per24 = new Person22("vae", 26, "男");
console.log("per24 = " + per24); // per24 = [object Object]
console.log("per24 = " + per24.toString()); // per24 = [object Object]
// 当我们直接在页面中打印一个对象时，其实是输出了对象的toString()方法的返回值。
// 如果我们希望在打印对象时，不输出[object Object]，可以手动为对象添加一个toString()方法。意思是，重写 toString() 方法。
// 重写 toString 方法
function Person23(name,age,gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
// 方式一 重写 Person 原型的toString方法。针对 Person 的所有实例生效
Person23.prototype.toString = function () {
    return ("Person23[name="+this.name+',age='+this.age+',gender='+this.gender+"]");
};
// 方式二：仅重写实例 per1 的 toString方法。但是这种写法，只对 per1 生效， 对 per2 无效
/*
per1.toString = function() {
    return ("Person23[name="+this.name+',age='+this.age+',gender='+this.gender+"]");
};
*/
var per25 = new Person23("dsff", 26, "男");
var per26 = new Person23("vae", 30, "男");
console.log("per25 = " + per25); // per25 = Person23[name=dsff,age=26,gender=男]
console.log("per26 = " + per26.toString()); // per26 = Person23[name=vae,age=30,gender=男]
// 重写了 Person23 原型的 toString(),这样的话，可以保证 Person 的所有实例生效
// 从这个例子，我们可以看出 `prototype` 的作用。

// JS的垃圾回收机制
/*
（1）当一个对象没有任何的变量或属性对它进行引用时，此时我们将永远无法操作该对象，此时这种对象就是一个垃圾，这种对象过多会占用大量的内存空间，导致程序运行变慢，所以这种垃圾必须进行清理。
（2）上面这句话，也可以这样理解：如果堆内存中的对象，没有任何变量指向它时，这个堆内存里的对象就会成为垃圾。
（3）JS拥有自动的垃圾回收机制，会自动将这些垃圾对象从内存中销毁。我们不需要也不能进行垃圾回收的操作。
（4）我们仅仅需要做的是：如果你不再使用该对象，那么，将改对象的引用设置为 null 即可。
 */

