// 传输json
// 获取的是一个 如果要获取多个
// document.querySelectorAll(selector)
// <h1>获取 json 数据</h1>
// <input type="button" value="获取json" id="btnJson" />
document.querySelector('#btnJson').onclick = function () {
    var ajax = new XMLHttpRequest();

    ajax.open('get', 'myJson.php');

    ajax.send();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // json 字符串 是字符串 所以我们可以 通过  responseText获取
            console.log(ajax.responseText);

            // 转化为 js对象
            var jsObj = JSON.parse(ajax.responseText);

            console.log(jsObj);

            // 拼接ul s
            var str = '';

            str += '<ul>';
            str += '<li>' + jsObj.name + '</li>';
            str += '<li>' + jsObj.skill + '</li>';
            str += '<li>' + jsObj.friend + '</li>';
            str += '</ul>';

            // 设置到界面上

            document.body.innerHTML = str;
        }
    };
};


// 传输XML
// <input type="button" value="获取XMl数据" id="getXML" />
document.querySelector('#getXML').onclick = function () {
    var ajax = new XMLHttpRequest();

    ajax.open('get', 'get_XMl.php');

    ajax.send();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            // 如果 返回的是 xml文件
            console.log(ajax.responseText);

            // 异步 对象中 有另外一个属性 用来专门获取 xml
            // xml对象 在浏览器段 就是一个 document对象
            // 解析时 可以直接使用 querySelector 或者 getElementById等等 document对象 有的语法
            console.log(ajax.responseXML);
            console.log(ajax.responseXML.querySelector('kuzi').innerHTML);
            // 下面这个 页面文档对象 如果要获取某个标签
            console.log(window.document);
        }
    };
};