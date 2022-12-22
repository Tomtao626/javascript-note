//联合类型（Union Types）表示取值可以为多种类型中的一种。
let myFavoriteNumber: string|number;
myFavoriteNumber = 'stringdddd';
myFavoriteNumber = 626;
// let myFavoriteNumber: string|number; 代表myFavoriteNumber可以是string类型，也可以是number类型， 但不可以是其他类型。

// 访问联合类型的属性和方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法：
function getLength(something: string|number) {
    //return something.length; // error TS2339: Property 'length' does not exist on type 'string | number'.Property 'length' does not exist on type 'number'.
}
//length 不是 string 和 number 的共有属性，所以会报错。
//访问 string 和 number 的共有属性是没问题的：
function getString(something: string|number) {
    return something.toString();
}

//联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

let UnionNumber: string | number;
UnionNumber = 'seven';
console.log(UnionNumber.length); // 5
UnionNumber = 7;
// console.log(UnionNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
//上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。

//而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了
