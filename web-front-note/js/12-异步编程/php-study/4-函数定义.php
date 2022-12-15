<?php
function functionName() {
    // 写代码
}
//（1）有参数，无返回值的函数
function sayName($name) {
    echo $name.'hello';
}
//（2）有参数、参数有默认值的函数
function sayFood($food='西兰花'){
	    echo $food.'好吃';
	}
	// 调用
	sayFood('西葫芦');// 如果传入参数,就使用传入的参数
	sayFood();// 如果不传入参数,直接使用默认值
//（3）有参数、有返回值的函数
function sum($a,$b){
		return $a+$b
	}
	sum(1,2);// 返回值为1+2 = 3
?>