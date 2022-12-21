// 任意值(Any)用来表示允许赋值为任意类型
let myFavoriteNumber: any = 'qazxsw';
myFavoriteNumber = 626;

// 任意值的属性和方法
// 在任意值上访问任何属性都是允许的：
let anyThing: any = 'hello';
console.log(anyThing.myName);
console.log(anyThing.myName.firstName);
// 也允许调用任何方法：
let anyThing1: any = 'tomtao';
anyThing.setName('tomt');
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
//声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。

//未声明类型的变量
//变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型：
let something;
something = 'seven';
something = 7;

something.setName('Tom');
console.log(something);
// 等价于
let something1: any;
something1 = 'seven';
something1 = 7;

something1.setName('Tom');
console.log(something1);
