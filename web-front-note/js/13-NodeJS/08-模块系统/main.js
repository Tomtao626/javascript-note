// var hello = require('./hello');
// hello.world();

// hello.js 通过 exports 对象把 world 作为模块的访问接口，
// 在 main.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问 hello.js 中 exports 对象的成员函数了。
const Utils = require('./utils');

utils = new Utils();
utils.setName('Tomtao626');
utils.sayHello();