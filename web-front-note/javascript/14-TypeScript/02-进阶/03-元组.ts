// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。
let tom: [string,number] = ['tom', 18];
console.log(tom); // [ 'tom', 18 ]
// 当赋值或访问一个已知索引的元素时，会得到正确的类型
tom[0].slice(); // 不同类型 支持使用对应的属性和方法
tom[1].toFixed();
console.log(tom); // [ 'tom', 18 ]

// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
let alice: [string, number];
alice = ['alice', 98]
console.log(alice);

// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
let alice1: [string, number];
alice = ['alice', 98]
alice.push('tii');
// alice.push(true); // TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.