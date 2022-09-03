const http = require('http');

const hostname = '127.0.0.1'; 

const port = '3000'; // 1000 ~ 9000 까지 있다 기본 포트 3000

const server = http.createServer((req, res) =>{ // 요청, 응답이 있어야 서버가 움직인다
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('hello world');
});


server.listen(port, hostname, ()=> {
    console.log(`Sever running at http://${hostname}:${port}`);
});