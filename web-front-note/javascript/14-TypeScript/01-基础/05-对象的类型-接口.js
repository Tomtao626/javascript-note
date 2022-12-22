// 定义了一个接口Person，接口一般首字母大写
var tomtao = {
    age: 18,
    name: 'tomtao',
    isMan: true
};
// 定义了一个变量tomtao，类型是 Person
//约束了 tomtao 的形状必须和接口 Person 一致。不能多也不能少
console.log(tomtao); // { age: 18, name: 'tomtao', isMan: true }
console.log(typeof tomtao); // object
var stu1 = {
    num: 1001011,
    name: 'tom',
    score: {
        chinese: 99,
        english: 98,
        tech: 96
    }
};
console.log(stu1); // {num: 1001011,name: 'tom',score: { chinese: 99, english: 98, tech: 96 }}
console.log(stu1.score); // { chinese: 99, english: 98, tech: 96 }
var stu2 = {
    num: 1001012,
    name: 'john',
    score: {
        chinese: 199,
        english: 198,
        tech: 196
    },
    age: 19
};
console.log(stu2); // {num: 1001012,name: 'john',score: { chinese: 199, english: 198, tech: 196 }}
console.log(stu2.score); // { chinese: 199, english: 198, tech: 196 }
var vm = {
    system: 'Unix',
    version: 6.0,
    size: '2c4g',
    price: 158,
    name: 890
};
console.log(vm); // { system: 'Unix', version: 6, size: '2c4g', price: 158, name: 890 }
var pi = {
    name: 'zhangsan',
    age: 19,
    gender: 'male'
};
console.log(pi); // { name: 'zhangsan', age: 19, gender: 'male' }
var container = {
    id: 87654,
    system: 'Unix',
    gender: 1
};
// container.id = 9876; // error TS2540: Cannot assign to 'id' because it is a read-only property.
console.log(container); // { id: 87654, system: 'Unix', gender: 1 }
// 使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
