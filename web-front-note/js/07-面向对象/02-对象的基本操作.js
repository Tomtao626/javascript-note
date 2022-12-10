// 创建对象
const obj = new Object();
//向obj中添加一个name属性
obj.name = '孙悟空';
//向obj中添加一个gender属性
obj.gender = '男';
//向obj中添加一个age属性
obj.age = 18;
console.log(JSON.stringify(obj)); // 将 obj 以字符串的形式打印出来  {"name":"孙悟空","gender":"男","age":18}
// 如果对象里本身没有某个属性，则用点语法赋值时，这个属性会被创建出来。

// 获取对象属性
//（1）对象.属性名; --- 如果获取对象中没有的属性，不会报错而是返回`undefined`。
obj.color = 'red';
console.log(obj.color); // red
console.log(obj.test); // undefined
//（2）可以使用`[]`这种形式去操作属性
/*
1.如果属性名的命名规范没有遵循标识符的命名规范，就不能采用`.`的方式来操作对象的属性，则必须用方括号的形式来访问。比如说，`123`这种属性名，如果我们直接写成`obj.123 = 789`来操作属性，是会报错的。那怎么办呢？办法如下：
2.注意，括号里的属性名，必须要加引号
3.获取属性
    对象['属性名']
4.设置属性值
    对象['属性名'] = 属性值;
 */
obj['123'] = 789;
// console.log(obj.123); // SyntaxError: missing ) after argument list
console.log(obj['123']); // 789
const person = {
    name: '孙悟空',
    age: 30
}

const myKey = 'name';
// 错误的访问方式
console.log(obj.myKey); // undefined
// 正确的访问方式
console.log(obj[myKey]); // 孙悟空

// 删除对象的属性
delete obj.age;
console.log(obj.age); // undefined 由于age属性已被删除 所以打印 undefined

// in 运算符 --- 检查一个对象中是否含有指定的属性。如果有则返回 true，没有则返回 false。
// //检查对象 obj 中是否含有name,age属性
console.log('name' in obj); // true
console.log('age' in obj); // false

// for of 遍历数组
let arr1 = [2, 6, 8, 5];

for (let value of arr1) {
    console.log(value);
}
// 注意，上面的数组中，`for ... of`获取的是数组里的值；如果采用`for ... in`遍历数组，则获取的是 index 索引值。

// Map对象的遍历 --- `for ... of`既可以遍历数组，也可以遍历 Map 对象。

// for in 遍历对象的属性 --- 主要用于遍历对象，不建议用来遍历数组。
// 对象中有几个属性，循环体就会执行几次。每次执行时，会将对象中的**每个属性的 属性名 赋值给变量**。
for (var key in obj) {
    console.log(key); // 这里的 key 是：对象属性的键（也就是属性名）
    console.log(obj[key]); // 这里的 obj[key] 是：对象属性的值（也就是属性值）
}

// for in 遍历数组（不建议）
const arr = ['hello1', 'hello2', 'hello3'];

for (const key in arr) {
    console.log('属性名：' + key);
    console.log('属性值：' + arr[key]);
}