var express = require('express');

var app = express();

app.use('/public', express.static('public'));
app.get('/index.html', function(req, res){
    res.sendFile(__dirname + "/" + "index.html");
})

app.get('/process_get', function(req, res){
    //输出JSON格式
    var response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name,
    }
    console.log(response);
    res.send(JSON.stringify(response));
})

var server = app.listen(8083, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
})