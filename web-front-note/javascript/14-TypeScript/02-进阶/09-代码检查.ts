// ESlint
// typescript-eslint
/*
（1）缩进应该是四个空格还是两个空格？
（2）是否应该禁用 var？
（3）接口名是否应该以 I 开头？
（4）是否应该强制使用 === 而不是 ==？
*/
// 安装
// npm install --save-dev eslint
// 由于 ESLint 默认使用 Espree 进行语法解析，无法识别 TypeScript 的一些语法，

// 故我们需要安装 @typescript-eslint/parser，替代掉默认的解析器，别忘了同时安装 typescript：
// npm install --save-dev typescript @typescript-eslint/parser

// 接下来需要安装对应的插件 @typescript-eslint/eslint-plugin 它作为 eslint 默认规则的补充，提供了一些额外的适用于 ts 语法的规则。
// npm install --save-dev @typescript-eslint/eslint-plugin

// .eslintrc.json
/*
module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
        // 禁止使用 var
        'no-var': "error",
        // 优先使用 interface 而不是 type
        '@typescript-eslint/consistent-type-definitions': [
            "error",
            "interface"
        ]
    }
}
*/

// 指定了两个规则，其中 no-var 是 ESLint 原生的规则，@typescript-eslint/consistent-type-definitions 是 @typescript-eslint/eslint-plugin 新增的规则。
// 规则的取值一般是一个数组（上例中的 @typescript-eslint/consistent-type-definitions），其中第一项是 off、warn 或 error 中的一个，表示关闭、警告和报错。后面的项都是该规则的其他配置。
// 如果没有其他配置的话，则可以将规则的取值简写为数组中的第一项（上例中的 no-var）。

// 关闭、警告和报错的含义如下：

// 关闭：禁用此规则
// 警告：代码检查时输出错误信息，但是不会影响到 exit code
// 报错：发现错误时，不仅会输出错误信息，而且 exit code 将被设为 1（一般 exit code 不为 0 则表示执行出现错误）

// index.ts 文件
var myName = "tom";
type foo = {};
// 执行 node_modules/.bin/eslint index.ts, 报错信息如下:
/*
1:1  error  Unexpected var, use let or const instead  no-var
  2:6  error  Use an `interface` instead of a `type`    @typescript-eslint/consistent-type-definitions

✖ 2 problems (2 errors, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
*/
// 上面的结果显示，刚刚配置的两个规则都生效了：禁止使用 var；优先使用 interface 而不是 type。
// 需要注意的是，我们使用的是 ./node_modules/.bin/eslint，而不是全局的 eslint 脚本，这是因为代码检查是项目的重要组成部分，所以我们一般会将它安装在当前项目中。

// 可是每次执行这么长一段脚本颇有不便，我们可以通过在 package.json 中添加一个 script 来创建一个 npm script 来简化这个步骤：
// 新建一个package.json文件
/*
{
    "scripts":{
        "eslint":"eslint index.ts";
    }
}
*/
// 执行 npm run eslint 即可

// 检查整个项目的ts文件
/*
{
    "scripts": {
        "eslint": "eslint src --ext .ts"
    }
}
*/
//此时执行 npm run eslint 即会检查 src 目录下的所有 .ts 后缀的文件。

// 使用 Prettier 修复格式错误

// npm install --save-dev prettier

//创建一个 prettier.config.js 文件，里面包含 Prettier 的配置项。Prettier 的配置项很少，这里我推荐大家一个配置规则，作为参考：
// prettier.config.js or .prettierrc.js
/*
module.exports = {
    // 一行最多 100 字符
    printWidth: 100,
    // 使用 4 个空格缩进
    tabWidth: 4,
    // 不使用缩进符，而使用空格
    useTabs: false,
    // 行尾需要有分号
    semi: true,
    // 使用单引号
    singleQuote: true,
    // 对象的 key 仅在必要时用引号
    quoteProps: 'as-needed',
    // jsx 不使用单引号，而使用双引号
    jsxSingleQuote: false,
    // 末尾不需要逗号
    trailingComma: 'none',
    // 大括号内的首尾需要空格
    bracketSpacing: true,
    // jsx 标签的反尖括号需要换行
    jsxBracketSameLine: false,
    // 箭头函数，只有一个参数的时候，也需要括号
    arrowParens: 'always',
    // 每个文件格式化的范围是文件的全部内容
    rangeStart: 0,
    rangeEnd: Infinity,
    // 不需要写文件开头的 @prettier
    requirePragma: false,
    // 不需要自动在文件开头插入 @prettier
    insertPragma: false,
    // 使用默认的折行标准
    proseWrap: 'preserve',
    // 根据显示样式决定 html 要不要折行
    htmlWhitespaceSensitivity: 'css',
    // 换行符使用 lf
    endOfLine: 'lf'
};
*/
// 由于 ESLint 也可以检查一些代码格式的问题，所以在和 Prettier 配合使用时，我们一般会把 ESLint 中的代码格式相关的规则禁用掉，否则就会有冲突了。

// 使用 AlloyTeam 的 ESLint 配置
//ESLint 原生的规则和 @typescript-eslint/eslint-plugin 的规则太多了，而且原生的规则有一些在 TypeScript 中支持的不好，需要禁用掉。
//这里我推荐使用 AlloyTeam ESLint 规则中的 TypeScript 版本，它已经为我们提供了一套完善的配置规则，
//并且与 Prettier 是完全兼容的（eslint-config-alloy 不包含任何代码格式的规则，代码格式的问题交给更专业的 Prettier 去处理）。
//npm install --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-alloy
/*
// 写入到.eslintrc.js文件即可
module.exports = {
    extends: [
        'alloy',
        'alloy/typescript',
    ],
    env: {
        // 您的环境变量（包含多个预定义的全局变量）
        // Your environments (which contains several predefined global variables)
        //
        // browser: true,
        // node: true,
        // mocha: true,
        // jest: true,
        // jquery: true
    },
    globals: {
        // 您的全局变量（设置为 false 表示它不允许被重新赋值）
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // 自定义您的规则
        // Customize your rules
    }
};
*/

// 使用 ESLint 检查 tsx 文件

// 安装 eslint-plugin-react
// npm install --save-dev eslint-plugin-react
//package.json 中的 scripts.eslint 添加 .tsx 后缀§
/*
{
    "scripts": {
        "eslint": "eslint src --ext .ts,.tsx"
    }
}
*/