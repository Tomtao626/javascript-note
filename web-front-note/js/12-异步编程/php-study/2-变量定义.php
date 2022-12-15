<?php
    // 字符串
    $str = '123';

    // 字符串拼接
    $str2 = '123'.'哈哈哈';


    // 整数
    $numA = 1; //正数
    $numB = -2;//负数

    // 浮点数
    $x = 1.1;

    // 布尔
    $a = true;
    $b = false;

    // 普通数组：数组中可以放 数字、字符串、布尔值等，不限制类型。
    $arr1 = array('123', 123);
    echo $arr1[0];

    // 关系型数组：类似于json格式
    $arr2 = $array(`name`=>`smyhvae`, `age`=>`26`);
    echo $arr2[`name`];  //获取时，通过  key 来获取
?>