const express = require('express');
const fs = require('fs'); //파일을 불러 올때 사용
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // post로 값 보낼때 사용

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: false })); // 노드에서는 파싱하는 방법이 2가지가 있는데 충돌나는 것을 방지 하기 위해 넣으주는 것

app.use(cookieParser('!@#$%^&*()')); //쿠키암호화설정


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
        const expiresDay = new Date(Date.now() + (1000 * 60 * 60 * 24));
        res.cookie('userid', userid, { expires: expiresDay, signed: true });
        res.redirect('/main');
    } else {
        res.redirect('/fail');
    }
});//라우트 생성

//127.0.0.1:3000/main
app.get('/main', (req, res) => {
    const cookieUserid = req.signedCookies.userid;
    console.log(cookieUserid);

    if (cookieUserid) {
        fs.readFile('main.html', 'utf8', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.end(data);
        })
    } else {
        res.redirect('/login')
    }
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
    res.clearCookie('userid');
    res.redirect('/login');
});//라우트 생성

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중...`);
});