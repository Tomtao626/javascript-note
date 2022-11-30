var Decimal = require("decimal.js");

console.log('加法：');
var a = 0.1;
var b = 0.2;
console.log(`${a} 以二进制显示：`, a.toString(2)); // 0.0001100110011001100110011001100110011001100110011001101
console.log(`${b} 以二进制显示：`, b.toString(2)); // 0.001100110011001100110011001100110011001100110011001101
console.log(a+b); //0.30000000000000004
console.log(new Decimal(a).add(new Decimal(b)).toNumber()); // 0.3

console.log('减法：');
var a = 1.0;
var b = 0.7;
console.log(`${a} 以二进制显示：`, a.toString(2)); // 1
console.log(`${b} 以二进制显示：`, b.toString(2)); // 0.1011001100110011001100110011001100110011001100110011
console.log(a-b); // 0.30000000000000004
console.log(new Decimal(a).sub(new Decimal(b)).toNumber()); // 0.3

console.log('乘法：');
var a = 1.01;
var b = 1.003;
console.log(`${a} 以二进制显示：`, a.toString(2)); // 1.0000001010001111010111000010100011110101110000101001
console.log(`${b} 以二进制显示：`, b.toString(2)); // 1.0000000011000100100110111010010111100011010100111111
console.log(a*b); // 1.0130299999999999
console.log(new Decimal(a).mul(new Decimal(b)).toNumber()); // 1.01303

console.log('除法：');
var a = 0.029;
var b = 10;
console.log(`${a} 以二进制显示：`, a.toString(2)); // 0.0000011101101100100010110100001110010101100000010000011001
console.log(`${b} 以二进制显示：`, b.toString(2)); // 1010
console.log(a/b); // 0.0029000000000000002
console.log(new Decimal(a).div(new Decimal(b)).toNumber()); // 0.0029