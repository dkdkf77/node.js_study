const express = require('express');
const bodyParser = require('body-parser'); // post 데이터를 전달 받기 위해 사용 npm i body body-parser
const app = express();
const port = 3000;


app.use((req, res) => {
    //body-parser 를 이용해 application / x=www=form-urlencoded 파싱했을때
    //string 방식하고 query 방식 두가지가 있다
    //두가지 방법중 기능적으로 충돌하는 메소드가 있는데 중복으로 적용을 막기위해 
    console.log('첫번째 미들웨어 실행');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`paramId:${userid}, paramPw: ${userpw}`);

    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' }); // utf -16 웹 이모지를 사용할때 쓰면 깨지지 않고 나옴
    res.write('<h2>익스프레스 서버에서 응답한 메시지입니다</h2>');
    res.write(`<p>아이디 : ${userid} </p>`);
    res.write(`<p>비밀번호 : ${userpw} </p>`);
    res.end();

});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 입니다.`)
});