const express = require('express');
const fs = require('fs'); // 파일에 관련된 기능 읽기 쓰기
const { type } = require('os');
const ejs = require('ejs');


const app = express();
const port = 3000;

const router = express.Router();//express에 라우터객체 기능 부여

// 127.0.0.1:3000/login

router.route('/login').post((req, res) => {
    const userinfo = { userid: 'apple', userpw: '1234' };
    fs.readFile('./ejs02.ejs', 'utf8', (err, data) => {
        if (!err) {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(ejs.render(data, userinfo)); // ejs 파일로 변환
        } else {
            console.log(err);
        }
    })
});



app.use('/', router);




//에러가 발생했을때 
app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중....`);
});