// Ajax原理（发送Ajax请求的5个步骤） 使用 XMLHttpRequest 对象的5个步骤
/*
（1）创建异步对象，即 XMLHttpRequest 对象
（2）使用 open 方法设置请求参数。open(method, url, async) 参数解释：请求的方法，请求的url，是否异步第三个参数如果不写，则默认为 true。
（3）发送请求：send()
（4）注册事件：注册 onreadystatechange 事件，状态改变时就会调用
    如果要在数据完整请求回来的时候才调用，我们需要手动写一些判断的逻辑。
（5）服务端响应，获取返回的数据
 */

// XMLHttpRequest 对象详解
// 发送请求：open(method, url, async);
/* 参数解释
- method：请求的类型；GET 或 POST
- url：文件在服务器上的位置
- async：true（异步）或 false（同步）
 */

// 另外还有个方法：（仅用于 POST 请求）
// send(string);

// POST 请求时注意
// 如果想让 像 form 表单提交数据那样使用 POST 请求，就需要使用 XMLHttpRequest 对象的 setRequestHeader()方法 来添加 HTTP 头。然后在 send() 方法中添加想要发送的数据：
var xmlhttp1 = new XMLHttpRequest();
xmlhttp1.open('POST', 'ajax_test.php', true);
xmlhttp1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xmlhttp1.send('name=smyhvae&age=27');

// onreadystatechange 事件 --- 注册 onreadystatechange 事件后，每当 readyState 属性改变时，就会调用 onreadystatechange 函数。
// readyState：（存有 XMLHttpRequest 的状态。从 0 到 4 发生变化）
/*
- 0: 请求未初始化
- 1: 服务器连接已建立
- 2: 请求已接收
- 3: 请求处理中
- 4: 请求已完成，且响应已就绪
status：
- 200: "OK"。
- 404: 未找到页面。
在 onreadystatechange 事件中，**当 readyState 等于 4，且状态码为 200 时，表示响应已就绪**。

服务器响应的内容
- responseText：获得字符串形式的响应数据。
- responseXML：获得 XML 形式的响应数据。
如果响应的是普通字符串，就使用 responseText；如果响应的是 XML，使用 responseXML。
 */

// 手写 Ajax --- get请求
//（1）创建XMLHttpRequest对象
var xmlhttp = new XMLHttpRequest();
//（2）设置请求的参数。包括：请求的方法、请求的url。
xmlhttp.open('get', '02-ajax.php');
//（3）发送请求
xmlhttp.send();
//（4）注册事件。 onreadystatechange事件，状态改变时就会调用。
xmlhttp.onreadystatechange = function () {
    // 为了保证 数据 完整返回，我们一般会判断 两个值
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        //（5）服务端相应：如果能够进入这个判断，说明数据请求成功了
        console.log('数据返回成功: ' + JSON.stringify(xmlhttp.responseText));
        // 伪代码：按业务需要，将接口返回的内容显示在页面上
        // document.querySelector('h1').innerHTML = xmlhttp.responseText;
    }
}

// 手写 Ajax --- post请求
//（1）异步对象
var xmlhttp2 = new XMLHttpRequest();

//（2）设置请求参数。包括：请求的方法、请求的url。
xmlhttp2.open('post', '02.post.php');

// 如果想要使用post提交数据,必须添加此行
xmlhttp2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

//（3）发送请求
xmlhttp2.send('name=fox&age=18');

//（4）注册事件
xmlhttp2.onreadystatechange = function () {
    //（5）服务端相应
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
        alert(xmlhttp2.responseText);
    }
};

// 封装 Ajax 请求 --- get请求
// 封装 Ajax为公共函数：传入回调函数 success 和 fail
function myAjax(url, success, fail) {
    // 1、创建XMLHttpRequest对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        // 兼容IE5、IE6浏览器。不写也没关系
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 2、发送请求
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    // 3、服务端响应
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            console.log('数据返回成功：' + obj);
            success && success(xmlhttp.responseText);
        } else {
            // 这里的 && 符号，意思是：如果传了 fail 参数，就调用后面的 fail()；如果没传 fail 参数，就不调用后面的内容。因为 fail 参数不一定会传。
            fail && fail(new Error('接口请求失败'));
        }
    };
}

// 单次调用 Ajax
myAjax('a.json', (res) => {
    console.log(res);
});

// 多次调用 Ajax
myAjax('a.json', (res) => {
    console.log(res);
    myAjax('b.json', (res) => {
       console.log(res);
       myAjax('c.json', (res) => {
          console.log(res);
       });
    });
});

// Ajax 请求：get 请求举例 见 index.html 02-ajax.php

// Ajax 多个接口的嵌套请求
// 我们在做异步任务的时候，经常会涉及到多个接口的嵌套请求。比如说，接口 1 请求完成后，需要根据接口 1 的数据请求接口 2；接口 2 请求完成后，需要根据接口 3 的数据请求接口 3，以此类推。
// - 请求接口 1，根据用户名获取用户 id
// - 请求接口 2，根据用户 id 获取用户的年龄、性别等信息。
myAjax('http://localhost:8888/php/user.php?name=tomtao626', (userInfo) => {
    // 根据第一个接口返回的 userInfo.id，继续请求第二个接口
    myAjax(`http://localhost:8888/php/info.php?id=${userInfo['id']}`, (res) => {
        console.log(response);
    });
});

// jQuery中的 Ajax
// https://www.w3school.com.cn/jquery/jquery_ref_ajax.asp
$.ajax({
    url:  'https://xxx.com/getUserInfo.php', // 接口的请求地址
    data: 'name=fox&age=18', // 请求参数
    type: 'GET', // 请求方式
    success: function (argument) {
        // 接口请求成功时调用
        console.log('接口请求成功');
    },
    beforeSend: function (arugument) {},
    error: function (argument) {
        // 接口请求失败时调用
        console.log('接口请求失败');
    },
});

// 代码举例