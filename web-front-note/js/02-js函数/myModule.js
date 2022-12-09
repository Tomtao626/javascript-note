function myModule() {
    //私有数据
    var msg = 'Qinguyihao Haha'

    //操作私有数据的函数
    function doSomething() {
        console.log('doSomething() ' + msg.toUpperCase()); //字符串大写
    }

    function doOtherthing() {
        console.log('doOtherthing() ' + msg.toLowerCase()) //字符串小写
    }

    //通过【对象字面量】的形式进行包裹，向外暴露多个函数
    return {
        doSomething1: doSomething,
        doOtherthing2: doOtherthing
    }
}