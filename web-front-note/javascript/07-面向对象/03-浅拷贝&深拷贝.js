// 浅拷贝：只拷贝最外面一层的数据；更深层次的对象，只拷贝引用。
// 深拷贝：拷贝多层数据；每一层级的数据都会拷贝。
// 拷贝引用是属于传地址，而非传值。
// 深拷贝会把对象里**所有的数据**重新复制到新的内存空间，是最彻底的拷贝。

// 浅拷贝的实现方式
// for in 实现浅拷贝
console.log('-------------------------浅拷贝-------------------------');
const obj1 = {
    name: 'tomtaoi626',
    age: 18,
    info: {
        desc: '很厉害',
    },
};
const obj2 = {};
// 将obj1的值拷贝给obj2
for (let key in obj1) {
    obj2[key] = obj1[key];
}
console.log('obj1: '+ JSON.stringify(obj1)); // obj1: {"name":"tomtaoi626","age":18,"info":{"desc":"很厉害"}}
console.log('obj2: '+ JSON.stringify(obj2)); // obj2: {"name":"tomtaoi626","age":18,"info":{"desc":"很厉害"}}
obj1.info.desc = '燕子沥青';
console.log('obj2: '+ JSON.stringify(obj2)); // obj2: {"name":"tomtaoi626","age":18,"info":{"desc":"燕子沥青"}}
// 用for in做拷贝时，只能做到浅拷贝。也就是说，在obj2中，name和age两个属性会单独存放在新的内存地址中，和obj1没有关系。
// 但是obj2.info属性，跟obj1.info属性，都指向的是同一个堆内存地址。所以当修改 `obj1.info` 里的值之后，`obj2.info`的值也会被修改。

// 用 Object.assign() 实现浅拷贝（推荐）
// 上面的 for in 方法做浅拷贝过于繁琐。ES6 给我们提供了新的语法糖，通过 `Object.assgin()` 可以实现**浅拷贝**。
const obj3 = Object.assign({}, obj1);
// 浅拷贝：把 obj1 拷贝给 obj3。如果 obj1 只有一层数据，那么，obj1 和 obj3 则互不影响
console.log('obj3: '+ JSON.stringify(obj3)); // obj3: {"name":"tomtaoi626","age":18,"info":{"desc":"燕子沥青"}}
obj1.info.desc = '天行九歌';
console.log('obj3: '+JSON.stringify(obj3)); // obj3: {"name":"tomtaoi626","age":18,"info":{"desc":"天行九歌"}}
// 由于 Object.assign() 只是浅拷贝，所以在当前这个案例中， obj3 中的 name 属性和 age 属性是单独存放在新的堆内存地址中的，和 obj1 没有关系；但是，`obj3.info` 属性，跟 `obj1.info`属性，**它俩指向的是同一个堆内存地址**。所以，当我修改 `obj1.info` 里的值之后，`obj3.info`的值也会被修改。

console.log('------------');
const myObj = {
    name: 'tomtao626',
    age: 18,
};

// 【写法1】浅拷贝：把 myObj 拷贝给 obj11
const obj11 = {};
Object.assign(obj11, myObj);
console.log(JSON.stringify(obj11));

// 【写法2】浅拷贝：把 myObj 拷贝给 obj22
const obj22 = Object.assign({}, myObj);
console.log(JSON.stringify(obj22));

// 【写法3】浅拷贝：把 myObj 拷贝给 obj31。注意，这里的 obj31 和 obj32 其实是等价的，他们指向了同一个内存地址
const obj31 = {};
const obj32 = Object.assign(obj31, myObj);
console.log(JSON.stringify(obj31));
console.log(JSON.stringify(obj32));
// 上面这三种写法，是等价的。所以，当我们需要将对象 A 复制（拷贝）给对象 B，不要直接使用 `B = A`，而是要使用 Object.assign(B, A)。

let obj12 = { name: 'tomtao', age: 15 };
let obj23 = { city: 'hz', age: 18 };
let obj33 = {};
Object.assign(obj33, obj23, obj12); // 将obj23, obj12的值拷贝给obj33
console.log(obj33); // { city: 'hz', age: 15, name: 'tomtao' }
// 将多个对象(obj23, obj12)合并成一个对象obj33

const object1 = {
    name: 'tomtao',
    age: 17,
    desc: 'hello world',
}
const object2 =  {
    name: '张飞',
    sex: '男',
}
// 将 object1 的值赋值给 object2 。返回值是object2
// 将 object1 的值追加到 object2 中。如果两个对象里的属性名相同，则 object2 中的值会被 object1 中的值覆盖。
Object.assign(object2, object1);
console.log(JSON.stringify(object2)); // {"name":"tomtao","sex":"男","age":17,"desc":"hello world"}


// 深拷贝的实现方式 --- 将浅拷贝进行递归
// for in 递归实现深拷贝
console.log('-------------------------深拷贝-------------------------');
let obj10 = {
    name: 'SmartOS626',
    age: 28,
    info: {
        desc: 'hello',
    },
    color: ['red', 'blue', 'green'],
}
let obj20 = {}
deepCopy(obj20, obj10);
obj10.info.desc = 'Apple';
console.log(obj20);
/*打印结果
{
  name: 'SmartOS626',
  age: 28,
  info: { desc: 'hello' },
  color: [ 'red', 'blue', 'green' ]
}
 */

// 深拷贝
function deepCopy(objNew, objOld) {
    for (let key in objOld) {
        // 获取属性值
        let item = objOld[key];
        if (item instanceof Array) {
            objNew[key] = [];
            deepCopy(objNew[key], item);
        } else if (item instanceof Object) {
            objNew[key] = {};
            deepCopy(objNew[key], item);
        } else {
            objNew[key] = item;
        }
    }
}



























