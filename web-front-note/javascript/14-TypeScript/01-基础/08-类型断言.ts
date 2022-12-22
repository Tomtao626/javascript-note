// 类型断言
// 手动指定一个值的类型
// 语法：（1）值 as 类型 只能在tsx语法中使用
// 语法：（2）<类型>值
// 形如 <Foo> 的语法在 tsx 中表示的是一个 ReactNode，在 ts 中除了表示类型断言之外，也可能是表示一个泛型。

// 类型断言的用途
// 将一个联合类型断言为其中一个类型  只能访问此联合类型的所有类型中共有的属性或方法：
interface Cat {
    name: string;
    run(): void;
}
interface Fish {
    name: string;
    swim(): void;
}
function getName(animal: Cat|Fish) {
    return animal.name;
}
// 有时候，我们确实需要在还不确定类型的时候就访问其中一个类型特有的属性或方法, 比如 获取 animal.swim 的时候会报错，就需要使用断言 将animal.swim断言为Fish
function isFish(animal: Cat|Fish) {
    if (typeof (animal as Fish).swim === 'function') {
        return true;
    }
    return false;
}
// 注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误：
function swim(animal: Cat | Fish) {
    (animal as Fish).swim();
}

const tom: Cat = {
    name: 'Tom',
    run() { console.log('run') }
};
swim(tom);
// Uncaught TypeError: animal.swim is not a function`
// 上面的例子编译时不会报错，但在运行时会报错：
/*
原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，将 animal 直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误。
可是 swim 函数接受的参数是 Cat | Fish，一旦传入的参数是 Cat 类型的变量，由于 Cat 上没有 swim 方法，就会导致运行时错误了。
总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
 */

// 将一个父类断言为更加具体的子类
// 当当类之间有继承关系时，也可以用类型断言
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}
function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
// 声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了。
// 但是由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code。

// 也可以是用 instanceof 来判断是不是 ApiError
function isApiError2(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
// 使用 instanceof 更加合适，因为 ApiError 是一个 JavaScript 的类，能够通过 instanceof 来判断 error 是否是它的实例。
// 但是有的情况下 ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了：

// 将任意类型断言为any
// window.foo = 'dnsdjs'
// 将 window 上添加一个属性 foo，但 TypeScript 编译时会报错，提示我们 window 上不存在 foo 属性。
// 此时我们可以使用 as any 临时将 window 断言为 any 类型：
(window as any).foo = 'dnsdis';
/*
在 any 类型的变量上，访问任何属性都是允许的。
需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。
它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。
上面的例子中，我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 foo 属性，as any 会更加方便。
总之，一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。
 */

// 将any断言为一个具体的类型
function getCacheData(key: string): any {
    return (window as any).cache[key];
}
interface Dog{
    name: string;
    run(): void;
}
const wangcai = getCacheData('wangcai') as Dog;
wangcai.run();
// 调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。

// 类型断言的限制
// 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可

// 双重断言
// 将任何一个类型断言为任何另一个类型。

// 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除：
// 所以类型断言不是类型转换，它不会真的影响到变量的类型。
// 若要进行类型转换，需要直接调用类型转换的方法：
// 类型声明是比类型断言更加严格的

// 泛型 解决上面那个问题
function getCacheData1<T>(key:string):T{
    return (window as any).cache[key];
}
interface Cat1 {
    name: string;
    run(): void;
}

const tom1 = getCacheData1<Cat1>('tom');
tom.run();