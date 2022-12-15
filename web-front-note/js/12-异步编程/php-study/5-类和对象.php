<?php
class Fox{
    public $name = 'itcast';
    public $age = 18;
}
$fox = new Fox;
// 对象属性取值
$name = $fox->name;
// 对象属性赋值
$fox->name = 'tomtao';

// 带构造函数的类
class Foxs {
    // 私有属性 外部无法访问
    var $name = 'tomtao';
    // 定义方法用来获取属性
    function Name() {
        return $this->name;
    }
    // 构造函数，可以传入参数
    function Fox2($name){
        $this->name = $name;
    }
}

// 定义了构造函数 需要使用构造函数初始化对象
$Fox2 = new Foxs('tomtao');
// 调用对象方法,获取对象名
$foxName = $fox->Name();
?>