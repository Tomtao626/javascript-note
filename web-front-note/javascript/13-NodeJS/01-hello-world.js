// 使用 Node.js 新建一个web服务
const http = require('http');
const express = require('express')


const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}`);
});