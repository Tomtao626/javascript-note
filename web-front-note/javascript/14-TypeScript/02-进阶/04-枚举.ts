// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
// 枚举使用enum关键字来定义
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// 枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射：
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

// 事实上，上面的例子会被编译为：
var Days1;
(function (Days1) {
    Days1[Days1["Sun"] = 0] = "Sun";
    Days1[Days1["Mon"] = 1] = "Mon";
    Days1[Days1["Tue"] = 2] = "Tue";
    Days1[Days1["Wed"] = 3] = "Wed";
    Days1[Days1["Thu"] = 4] = "Thu";
    Days1[Days1["Fri"] = 5] = "Fri";
    Days1[Days1["Sat"] = 6] = "Sat";
})(Days1 || (Days1 = {}));

// 手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days2["Sun"] === 7); // true
console.log(Days2["Mon"] === 1); // true
console.log(Days2["Tue"] === 2); // true
console.log(Days2["Sat"] === 6); // true
// 未手动赋值的枚举项会接着上一个枚举项递增。
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的：
enum Days3 {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days3["Sun"] === 3); // true
console.log(Days3["Wed"] === 3); // true
console.log(Days3[3] === "Sun"); // false
console.log(Days3[3] === "Wed"); // true

// 上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了。编译的结果是：

var Days4;
(function (Days4) {
    Days4[Days4["Sun"] = 3] = "Sun";
    Days4[Days4["Mon"] = 1] = "Mon";
    Days4[Days4["Tue"] = 2] = "Tue";
    Days4[Days4["Wed"] = 3] = "Wed";
    Days4[Days4["Thu"] = 4] = "Thu";
    Days4[Days4["Fri"] = 5] = "Fri";
    Days4[Days4["Sat"] = 6] = "Sat";
})(Days4 || (Days4 = {}));

// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)：
enum Days6 {Sun = 7, Mon, Tue, Wed, Thu, Fri,Sat=<any>'S'};
console.log(Days6);
// 编译结果为：
var Days5;
(function (Days5) {
    Days5[Days5["Sun"] = 7] = "Sun";
    Days5[Days5["Mon"] = 8] = "Mon";
    Days5[Days5["Tue"] = 9] = "Tue";
    Days5[Days5["Wed"] = 10] = "Wed";
    Days5[Days5["Thu"] = 11] = "Thu";
    Days5[Days5["Fri"] = 12] = "Fri";
    Days5[Days5["Sat"] = "S"] = "Sat";
})(Days5 || (Days5 = {}));
// 手动赋值也可以是小数或负数此时后续未手动赋值的项的递增步长仍为 1：

enum Days7 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days7["Sun"] === 7); // true
console.log(Days7["Mon"] === 1.5); // true
console.log(Days7["Tue"] === 2.5); // true
console.log(Days7["Sat"] === 6.5); // true
console.log(Days7);

// 常数枚举
// 常数枚举是使用 const enum 定义的枚举类型：
const enum Directions {Up,Down,Left,Right};
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
var directions2 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 外部枚举
// 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型：
declare enum Directions2 {
    Up,
    Down,
    Left,
    Right
}

let directions3 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];
// delcare定义的类型只会用作编译时检查，编译结果中会删除。
console.log(directions3);
// 编译结果
var directions4 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 外部枚举与声明语句一样，常出现在声明文件中。
// 同时使用 declare 和 const 也是可以的：

declare const enum Directions5 {
    Up,
    Down,
    Left,
    Right
}

let directions5 = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 编译结果：

var directions6 = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];