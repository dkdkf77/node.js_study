const express = require('express');
const app = express();
const port = 3000;


app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');



    console.dir(req.header) // console.dir 은 요청한 header에 전달하는 것
    const userAgent = req.header('User-Agent');
    console.log(userAgent);

    //http://loclahost:3000/?userid=apple&userpw=1111 -> get방식 서버요청 (값을 get 전달)
    const paramName = req.query.userid;
    //get방식으로 서버에서 받은 값을 임시저장공간에 저장할때 req.query.변수명
    console.log(paramName);
    res.writeHead(200, { 'content-type': 'text/html;charset=utf-8' }); // utf -16 웹 이모지를 사용할때 쓰면 깨지지 않고 나옴
    res.write('<h2>익스프레스 서버에서 응답한 메시지입니다</h2>');
    res.write(`<p>userAgent : ${userAgent} </p>`);
    res.write(`<p>paramName : ${paramName} </p>`);
    res.end();

});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 입니다.`)
});