const express = require('express');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cookieParser());


//127.0.0.1:3000/setCookie
app.get('/setCookie', (req, res) => {
    console.log('setCoolie호출');
    res.cookie('member', {
        id: 'apple',
        name: '김사과',
        gender: 'female'
    }, {
        maxAge: 1000 * 60 * 60 // 초 분 시간
    }); //쿠키를 생성

    res.redirect('/showCookie');//완료시 가로 안 라우터로 이동
});//라우트 생성

//127.0.0.1:3000/showCookie
app.get('/showCookie', (req, res) => {
    console.log('showCookie호출')
    res.send(req.cookie);//서버에서 사용자에게 정보를 전달(실행시 화면에 출력)
    res.end();
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`)
})