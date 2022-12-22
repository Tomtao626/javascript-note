// 接口interface
// 使用接口（Interfaces）来定义对象的类型。
interface Person {
    age: number;
    name: string;
    isMan: boolean;
}

// 定义了一个接口Person，接口一般首字母大写

let tomtao: Person = {
    age: 18,
    name: 'tomtao',
    isMan: true,
}
// 定义了一个变量tomtao，类型是 Person
//约束了 tomtao 的形状必须和接口 Person 一致。不能多也不能少

console.log(tomtao); // { age: 18, name: 'tomtao', isMan: true }
console.log(typeof tomtao); // object

// 可选属性
//有时我们希望不要完全匹配一个形状，那么可以用可选属性：
interface Student {
    num: number,
    name: string,
    score: object,
    age?: number, // ?:代表可选属性
}

let stu1: Student = {
    num: 1001011,
    name: 'tom',
    score: {
        chinese: 99,
        english: 98,
        tech: 96,
    },
}
console.log(stu1); // {num: 1001011,name: 'tom',score: { chinese: 99, english: 98, tech: 96 }}
console.log(stu1.score); // { chinese: 99, english: 98, tech: 96 }

let stu2: Student = {
    num: 1001012,
    name: 'john',
    score: {
        chinese: 199,
        english: 198,
        tech: 196,
    },
    age: 19,
}
console.log(stu2); // {num: 1001012,name: 'john',score: { chinese: 199, english: 198, tech: 196 }}
console.log(stu2.score); // { chinese: 199, english: 198, tech: 196 }
// 可选属性的含义是该属性可以不存在。仍然不允许添加未定义的属性。

// 任意属性
// 定义一个接口允许有任意的属性，可以使用如下方式：
interface VirtualMachine {
    system: string,
    version: number,
    size: string,
    price?: number,

    [name: string]: any,
}

let vm: VirtualMachine = {
    system: 'Unix',
    version: 6.0,
    size: '2c4g',
    price: 158,
    name: 890,
}
console.log(vm); // { system: 'Unix', version: 6, size: '2c4g', price: 158, name: 890 }
// 使用 [name: string] 定义了任意属性取 string 类型的值。
//需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：

// 比如下面这种 就不可以
/*
interface PersonInfo {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
*/
// 任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。
//另外，在报错信息中可以看出，此时 { name: 'Tom', age: 25, gender: 'male' } 的类型被推断成了 { [x: string]: string | number; name: string; age: number; gender: string; }，这是联合类型和接口的结合。

//一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
interface PersonInfo {
    name: string,
    age?:number,
    [gender:string]: string|number,
}
let pi:PersonInfo = {
    name: 'zhangsan',
    age: 19,
    gender: 'male',
}
console.log(pi); // { name: 'zhangsan', age: 19, gender: 'male' }

// 只读属性
// 对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：
interface Container {
    readonly id: number,
    version?: number,
    system: string,
    [gender:string]:any,
}
let container: Container = {
    id: 87654,
    system: 'Unix',
    gender: 1,
}
// container.id = 9876; // error TS2540: Cannot assign to 'id' because it is a read-only property.
console.log(container); // { id: 87654, system: 'Unix', gender: 1 }
// 使用 readonly 定义的属性 id 初始化后，又被赋值了，所以报错了。
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：