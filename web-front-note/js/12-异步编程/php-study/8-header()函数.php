<?php
//浏览器访问http服务器，接收到响应时，会根据响应**报文头**的内容进行一些具体的操作。在php中，我们可以根据 **header** 来设置这些内容。
//header()函数的作用**：用来向客户端(浏览器)发送报头。直接写在php代码的第一行就行。

//下面列举几个常见的 header函数。

//（1）设置编码格式：

header('content-type:text/html; charset= utf-8');

//例如：

header('content-type:text/html; charset= utf-8');
echo "我的第一段 PHP 脚本";

//（2）设置页面跳转：

header('location:http://www.baidu.com');

//设置页面刷新的间隔：

header('refresh:3; url=http://www.xiaomi.com');