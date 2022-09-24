const express = require('express');
const fs = require('fs'); // 파일에 관련된 기능 읽기 쓰기
const { type } = require('os');
const ejs = require('ejs');


const app = express();
const port = 3000;

const router = express.Router();//express에 라우터객체 기능 부여

const header = fs.readFileSync('./header.ejs', 'utf-8'); //readFileSync 비동기식
const body = fs.readFileSync('./body.ejs', 'utf-8');


//localhost:3000/about
router.route('/about').post((req, res) => {
    const html = ejs.render(header, { title: '매개변수로 전달된 제목입니다', content: ejs.render(body, { messages: '매개변수로 전달된 텍스트 메세지 입니다.' }) });
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(html);
})





app.use('/', router);




//에러가 발생했을때 
app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중....`);
});