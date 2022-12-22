// allowJS
// 允许编译JS文件
// 设置为true时，tsc会编译js文件，否则不会

// allowSyntheticDefaultImports
// 允许对不包含默认导出的模块使用默认导入。这个选项不会影响生成的代码，只会影响类型检查。
// export = foo 是ts为了兼容commonJS创造的语法，对应于commonJS中的module.export = foo;
// 在 ts 中，如果要引入一个通过 export = foo 导出的模块，标准的语法是 import foo = require('foo')，或者 import * as foo from 'foo'。
// 但由于历史原因，我们已经习惯了使用 import foo from 'foo'。
// allowSyntheticDefaultImports就是为了解决这个问题，当设置为true时，允许使用 import foo from 'foo' 来导入一个通过 export = foo 导出的模块。当它设置为 false 时，则不允许，会报错。
// 当然，我们一般不会在 ts 文件中使用 export = foo 来导出模块，而是在写（符合 commonjs 规范的）第三方库的声明文件时，才会用到 export = foo 来导出类型。