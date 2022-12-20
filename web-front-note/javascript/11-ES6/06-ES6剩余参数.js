// 剩余参数 --- 当函数的实参个数大于形参个数时，我们可以将剩余的实参放到一个数组中。
// 传统写法
function fn(a,b,c) {
    console.log(a);
    console.log(b);
    console.log(c);
    // console.log(d); // ReferenceError: d is not defined
}
fn(1,2,3);
// 因为方法的参数是三个，但使用时是用到了四个参数，所以会报错：

// ES6写法
const fn1 = (...args) => {
    //当不确定方法的参数时，可以使用剩余参数
    console.log(args[0]);
    console.log(args[1]);
    console.log(args[2]);
    console.log(args[3]);
};

fn1(1, 2);
fn1(1, 2, 3); //方法的定义中了四个参数，但调用函数时只使用了三个参数，ES6 中并不会报错。

// 例子
function fn2(first, ...args) {
    console.log(first); // 10
    console.log(args); // 数组：[20, 30]
}

fn2(10, 20, 30);

// 剩余参数的举例：参数求和
const sum = (...args) => {
  let total = 0;
  args.forEach(item => total += item);
  return total;
};
console.log(sum(1,2,3,4)); // 10
console.log(sum(1,2,3)); // 6

// 剩余参数和解构赋值配合使用
const stus = ['张三', '李四', '王五'];
let [s1, ...s2] = stus;
console.log(s1); // 张三
console.log(s2); // [ '李四', '王五' ]

// 扩展运算符 --- 扩展运算符和剩余参数是相反的。
// 剩余参数是将剩余的元素放到一个数组中；而扩展运算符是将数组或者对象拆分成逗号分隔的参数序列。
const arr = [1,2,3];
// ...arr
console.log(...arr); // 1 2 3
console.log(10,20,30); // 10 20 30
// `arr`是一个数组，而`...arr`则表示`10, 20, 30`这样的序列。
// 我们把`...arr` 打印出来，发现打印结果竟然是 `10 20 30`，为啥逗号不见了呢？因为逗号被当作了 console.log 的参数分隔符。如果你不信，可以直接打印 `console.log(10, 20, 30)` 看看。

// 数组赋值
let arr1 = ['www', 'smyhvae', 'com'];
let arr2 = arr1; // 将 arr1 赋值给 arr2，其实是让 arr2 指向 arr1 的内存地址
console.log('arr1:' + arr1);
console.log('arr2:' + arr2);
console.log('---------------------');

arr2.push('你懂得'); //往 arr2 里添加一部分内容
console.log('arr1:' + arr1);
console.log('arr2:' + arr2);
// 我们往往 arr2 里添加了`你懂的`，却发现，arr1 里也有这个内容。原因是：`let arr2 = arr1;`其实是让 arr2 指向 arr1 的地址。也就是说，二者指向的是同一个内存地址。
// 如果不想让 arr1 和 arr2 指向同一个内存地址，我们可以借助**扩展运算符**来做：
let arr3 = ['www', 'smyhvae', 'com'];
let arr4 = [...arr3]; //【重要代码】arr4 会重新开辟内存地址
console.log('arr3:' + arr3);
console.log('arr4:' + arr4);
console.log('---------------------');

arr4.push('你懂得'); //往arr4 里添加一部分内容
console.log('arr3:' + arr3);
console.log('arr4:' + arr4);

// 合并数组
let arr5 = ['王一', '王二', '王三'];
let arr6 = ['王四', '王五', '王六'];

// 方法1
let arr7 = [...arr5, ...arr6];
console.log(arr7); // ["王一", "王二", "王三", "王四", "王五", "王六"]

// 方法2
arr1.push(...arr6);
console.log(arr5); // ["王一", "王二", "王三", "王四", "王五", "王六"]

// 将伪数组或者可遍历对象转换为真正的数组
const myDivs = document.getElementsByClassName('div');
const divArr = [...myDivs]; // 利用扩展运算符，将伪数组转为真正的数组

// 还有一种方式，可以将伪数组（或者可遍历对象）转换为真正的数组。语法格式如下：
let arr8 = Array.from(arrayLike);