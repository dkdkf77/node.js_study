const express = require('express');
const { send } = require('express/lib/response');
const app = express(); //미들웨어 함수 추가하기 위해
const port = 3000;

//127.0.0.1:3000;
//localhost:3000;

app.get('/', (req, res) => {
    res.send('익스프레스 서버 테스트');
});// / = 현재 폴더라는 개념

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중`);
});

