const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const router = express.Router();//express에 라우터객체 기능 부여

app.use(bodyParser.urlencoded({ extended: false }));

// http://localhost:3000/member/login -> post
router.route('/member/login').post(() => {
    console.log('member/login 호출')
});

// http://localhost:3000/member/regist -> post
router.route('/member/regist').post(() => {
    console.log('member/regist 호출')
});

// http://localhost:3000/member/about -> get
router.route('/member/about').get(() => {
    console.log('member/about 호출')
});


app.use('/', router);

//에러가 발생했을때 
app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
});

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중....`);
});