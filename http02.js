const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('test.html', (err, data) => {
        //예외처리
        if (err) {
            console.log('에러발생')
        } else {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        }
    }); // 파일 읽기를 하거나 할때 에러 변수와 data를 넣어준다

}).listen(3000, () => {
    console.log('서버2 실행중');
});