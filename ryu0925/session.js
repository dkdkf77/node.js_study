const express = require('express');
const expressSession = require('express-session');
const fs = require('fs'); //파일을 불러 올때 사용
const bodyParser = require('body-parser'); // post로 값 보낼때 사용

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false })); // 노드에서는 파싱하는 방법이 2가지가 있는데 충돌나는 것을 방지 하기 위해 넣어주는 것
app.use(expressSession({
    secret: '!@#$%^&*()',
    resave: false, // false 고정값, true 변동이 자주 될때
    saveUninitialized: true

}))


//127.0.0.1:3000/login
app.get('/login', (req, res) => {
    fs.readFile('login.html', 'utf8', (err, data) => {
        if (!err) {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        } else {
            console.log(err);
        };
    });
});//라우트 생성

//127.0.0.1:3000/loginOk
app.post('/loginOk', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(userid);
    console.log(userpw);

    //admin, 12345
    if (userid == 'admin' && userpw == '12345') {
        req.session.member = {
            id: userid,
            userpw: userpw,
            isauth: true // 인증이 되었다
        };
        res.redirect('/main');
    } else {
        res.redirect('/fail');
    }
});//라우트 생성

//127.0.0.1:3000/main
app.get('/main', (req, res) => {

    if (req.session.member) {
        console.log(req.session.member);
        fs.readFile('main.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        })
    } else {
        res.redirect('/login');
    };
});//라우트 생성

//127.0.0.1:3000/fail
app.get('/fail', (req, res) => {
    fs.readFile('fail.html', 'utf8', (err, data) => {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(data);
    })
});//라우트 생성

//127.0.0.1:3000/logOut
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        console.log('세션이 삭제되었습니다')
    });
    res.redirect('/login');
});//라우트 생성

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});