// 数组的解构赋值
et [a, b, c] = [1, 2, 3];
console.log(a,b,c);

// 对象的解构赋值
const person = { name: 'tomtao626', age: 28, sex: '男' };
let { name, age, sex } = person; // 对象的结构赋值
console.log(name); // 打印结果：tomtao626
console.log(age); // 打印结果：28
console.log(sex); // 打印结果：男

// 给左边的变量自定义命名
const person1 = { name: 'qianguyihao', age: 28 };
let { name: myName, age: myAge } = person1; // 对象的结构赋值

console.log(myName); // 打印结果：qianguyihao
console.log(myAge); // 打印结果：28

console.log(name); // 打印报错：Uncaught ReferenceError: name is not defined
console.log(age); // 打印报错：Uncaught ReferenceError: age is not defined

// 圆括号的使用
// 如果变量 foo 在解构之前就已经定义了，此时你再去解构，就会出现问题。下面是错误的代码，编译会报错：
let foo = 'haha';
// { foo } = { foo: 'smyhvae' }; // 报错
console.log(foo);

// 要解决报错，只要在解构的语句外边，加一个圆括号即可：

let foo1 = 'haha';
({ foo1 } = { foo1: 'smyhvae' });
console.log(foo1); //输出结果：smyhvae

// 字符串解构 --- 字符串被转换成了一个类似数组的对象
const [a, b, c, d] = 'hello';
console.log(a);
console.log(b);
console.log(c);

console.log(typeof a); //输出结果：string