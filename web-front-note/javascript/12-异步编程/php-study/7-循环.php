<?php

//for 循环：
for ($x=0; $x<=10; $x++) {
    echo "数字是：$x <br>";
}

//foreach 循环：
$colors = array("red","green","blue","yellow");

foreach ($colors as $value) {
    echo "$value <br>";
}
/*
 * 参数一：循环的对象。参数二：将对象的值挨个取出，直到最后。如果循环的是对象，输出的是对象的属性的值。
 */