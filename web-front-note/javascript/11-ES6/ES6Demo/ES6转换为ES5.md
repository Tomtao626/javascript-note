## 将ES6的语法转为ES5（为了兼容 ES5）

> 掌握 ES6 之后，如果你的业务需要考虑 ES5 的兼容性，则可以这样做：写 ES6 语法的 js 代码，然后通过 `Babel`将 ES6 转换为 ES5。如果没有这样的需要，那么下面的内容，了解即可。

babel 的作用是将 ES6 语法转为 ES5 语法，支持低端浏览器。

但是，在这之前，我们需要配置一下相关的环境。

### 建立工程目录

（1）先建立一个空的工程目录 `ES6Demo`，并在目录下建立两个文件夹 `src`和 `dist`：

-   `src`：书写 ES6 代码，我们写的 js 程序都放在这里。

-   `dist`：利用 Babel 编译生成的 ES5 代码。**我们在 HTML 页面需要引入 dist 里的 js 文件**。

（2）在 src 里新建文件 `index.html`：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Document</title>
        <!-- 我们引入 ES5 中的 js 文件，而不是引入 ES6 中的 js 文件。 -->
        <script src="./dist/index.js"></script>
    </head>
    <body></body>
</html>
```

**注意**，上方代码中，我们引入的是`dist`目录下的 js 文件。

然后我们新建文件 `src/index.js`：

```javascript
let a = 'smyhvae';
const b = 'qianguyihao';

console.log(a);
console.log(b);
```

这个文件是一个 ES6 语法 的 js 文件，稍后，我们尝试把这个 ES6 语法的 js 文件转化为 ES5 的 js 文件。

PS：我们在写代码时，能用单引号尽量用单引号，而不是双引号，前者在压缩之后，程序执行会更快。

### 全局安装 Babel-cli

（1）初始化项目：

在安装 Babel 之前，需要先用 npm init 先初始化我们的项目。打开终端或者通过 cmd 打开命令行工具，进入项目目录，输入如下命令：

```bash
	npm init -y
```

上方代码中，`-y` 代表全部默认同意，就不用一次次按回车了（稍后再根据需要，在文件中手动修改）。命令执行完成后，会在项目的根目录下生成 package.json 文件：

```json
{
    "name": "es6demo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "smyhvae",
    "license": "ISC"
}
```

PS：VS Code 里打开终端的快捷键是：`Contol + ~`。

（2）全局安装 Babel-cli：

在终端中输入以下命令：

```bash
	npm install -g babel-cli
```

![](http://img.smyhvae.com/20180304_1305.png)

如果安装比较慢的话，Mac 下可以使用`cnpm`进行安装 ，windows 下可以使用`nrm`切换到 taobao 的镜像。

（3）本地安装 babel-preset-es2015 和 babel-cli：

```bash
	npm install --save-dev babel-preset-es2015 babel-cli
```

![](http://img.smyhvae.com/20180304_1307.png)

安装完成后，会发现`package.json`文件，已经多了 devDependencies 选项：

![](https://img.smyhvae.com/20180304_1308.png)

（4）新建.babelrc：

在根目录下新建文件`.babelrc`，输入如下内容：

```
{
    "presets":[
        "es2015"
    ],
    "plugins":[]
}
```

（5）开始转换：

现在，我们应该可以将 ES6 的文件转化为 ES5 的文件了，命令如下：（此命令略显复杂）

```
	babel src/index.js -o dist/index.js
```

我们可以将上面这个命令进行简化一下。操作如下：

在文件 `package.json` 中修改键 `scripts`中的内容：

```json
  "scripts": {
    "build": "babel src/index.js -o dist/index.js"
  },
```

修改后的效果如下：

![](https://img.smyhvae.com/20180304_1315.png)

目前为止，环境配置好了。以后，我们执行如下命令，即可将`src/index.js`这个 ES6 文件转化为 `dist/index.js`这个 ES5 文件：

```bash
	npm run build
```

我们执行上面的命令之后，会发现， dist 目录下会生成 ES5 的 js 文件：

index.js：

```javascript
'use strict';

var a = 'smyhvae';
var b = 'qianguyihao';

console.log(a);
console.log(b);
```

当我们打开网页后，就可以在浏览器的控制台，看到代码的输出结果。