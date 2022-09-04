const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('node.png', (err, data) => {
        if (!err) {
            res.writeHead(200, { 'content-type': 'image/png' })
            res.end(data);
        } else {
            console.log('err');
        }
    })
}).listen(3000, () => {
    console.log('이미지 서버 실행중');
});

http.createServer((req, res) => {
    fs.readFile('sunny.mp3', (err, data) => {
        if (!err) {
            res.writeHead(200, { 'content-type': 'audio/mp3' });
            res.end(data);
        } else {
            console.log('err');
        }
    })
}).listen(3001, () => {
    console.log('비디오 서버 실행중');
});