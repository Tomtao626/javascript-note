// JSON对象
/*
1、js对象(数组) --> json对象(数组)：
 */
var obj = {"username":"test1","age":18};
console.log(JSON.stringify(obj));

/*
2、json对象(数组) --> js对象(数组)：
 */
json = '{"test":666}'
console.log(JSON.parse(json));
// 通常说的“json字符串”，只有两种：**json对象、json数组**。

// Object扩展
// Object.create(prototype, [descriptors])
// 作用: 以指定对象为原型，创建新的对象。同时，第二个参数可以为为新的对象添加新的属性，并对此属性进行描述。
// 举例：没有第二个参数时
var obj1 = {username: 'smyhvae', age: 26};
var obj2 = {address:'shenzhen'};

obj2 = Object.create(obj1);
console.log(obj2);

// 举例：有第二个参数时
var obj3 = {username: 'smyhvae', age: 26};
var obj4 = {address:'shenzhen'};

obj4 = Object.create(obj3, {
    sex:{
        //给obj4添加新的属性`sex`。注意，这一行的冒号不要漏掉
        value: '男',  //通过value关键字设置sex的属性值
        writable: false,
        configurable: true,
        enumerable: true
    }
});
console.log(obj4);

// 上方代码中，我们通过第5行的sex给obj2设置了一个新的属性`sex`，但是要通过`value`来设置属性值（第6行）。
// 设置完属性值后，这个属性值默认是不可修改的，要通过`writable`来设置。总而言之，这几个关键字的解释如下：
// - `value`：设置属性值。
// - `writable`：标识当前属性值是否可修改。如果不写的话，默认为false，不可修改。
// - `configurable`：标识当前属性是否可以被删除。默认为false，不可删除。
// - `enumerable`：标识当前属性是否能用 for in 枚举。 默认为false，不可。

// Object.defineProperties(object, descriptors) --- 为指定对象定义扩展多个属性。
var obj5 = {
    firstName : 'smyh',
    lastName : 'vae'
};
Object.defineProperties(obj5, {
    fullName : {
        get : function () {
            return this.firstName + '-' + this.lastName
        },
        set : function (data) {  //监听扩展属性，当扩展属性发生变化的时候自动调用，自动调用后将变化的值作为实参注入到set函数
            var names = data.split('-');
            this.firstName = names[0];
            this.lastName = names[1];
        }
    }
});
console.log(obj5.fullName);
obj5.firstName = 'tim';
obj5.lastName = 'duncan';
console.log(obj5.fullName);
obj5.fullName = 'kobe-bryant';
console.log(obj5.fullName);
// - get ：用来获取当前属性值的回调函数
// - set ：修改当前属性值得触发的回调函数，并且实参即为修改后的值
// 存取器属性：setter,getter一个用来存值，一个用来取值。

// Object的扩展（二）--- obj对象本身就自带了两个方法。
// get 属性名(){} 用来得到当前属性值的回调函数
// set 属性名(){} 用来监视当前属性值变化的回调函数
var obj7 = {
    firstName : 'kobe',
    lastName : 'bryant',
    get fullName(){
        return this.firstName + ' ' + this.lastName
    },
    set fullName(data){
        var names = data.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
    }
};
console.log(obj7.fullName);
obj7.fullName = 'curry stephen';
console.log(obj7.fullName);

// 数组的扩展
/*
**方法1**：

Array.prototype.indexOf(value)
作用：获取 value 在数组中的第一个下标。

**方法2**：

Array.prototype.lastIndexOf(value)
作用：获取 value 在数组中的最后一个下标。

**方法3**：遍历数组

Array.prototype.forEach(function(item, index){})

**方法4**：

Array.prototype.map(function(item, index){})
作用：遍历数组返回一个新的数组，返回的是**加工之后**的新数组。


**方法5**：

Array.prototype.filter(function(item, index){})
作用：遍历过滤出一个新的子数组，返回条件为true的值。

## 函数function的扩展：bind()

> ES5中新增了`bind()`函数来改变this的指向。

```javascript
	Function.prototype.bind(obj)
```
作用：将函数内的this绑定为obj, 并将函数返回。

**面试题**: call()、apply()和bind()的区别：
- 都能改变this的指向
- call()/apply()是**立即调用函数**
- bind()：绑定完this后，不会立即调用当前函数，而是**将函数返回**，因此后面还需要再加`()`才能调用。
PS：bind()传参的方式和call()一样。

**分析**：
为什么ES5中要加入bind()方法来改变this的指向呢？因为bind()不会立即调用当前函数。
bind()通常使用在回调函数中，因为回调函数并不会立即调用。如果你希望在回调函数中改变this，不妨使用bind()。
 */