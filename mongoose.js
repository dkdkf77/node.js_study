const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

//데이터 베이스 연결
let database; //데이터베이스 객체명
let UserSchema; //데이터베이스 스키마명
let UserModel; // 데이터베이스의 기본틀명



function connectDB() {
    const url = 'mongodb://127.0.0.1:27017/frontenddb01'; //데이터 베이스에 연결 경로 설정
    console.log('데이터베이스 연결 시도중...');

    mongoose.Promise = global.Promise; // Promise = 동기식으로 바꿔줌
    //몽구스의 프로미스 객체를 global의 프로미스 객체로 사용
    //동기식이더라도 비동기식으로 사용
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    database = mongoose.connection;// database 객체에 frontenddb01까지 연결된 상태를 의미
    database.on('error', console.error.bind(console, 'mongoose 연결 실패!'));
    // 데이터 베이스 에러가 발생했을때 console에 에러표시 하기 그리고(console 타입으로,mongoose 연결 실패! 출력)

    database.on('open', () => {// 데이터베이스 정상적으로 연결 되었을때 
        console.log('데이터베이스 연결 성공');
        //스키마설정
        UserSchema = mongoose.Schema({
            userid: String,
            userpw: String,
            username: String,
            gender: String
        });
        console.log('UserSchema 생성완료');

        //가상의 함수를 생성 list 생성시 사용
        UserSchema.static('findAll', function (callback) {
            return this.find({}, callback);
        });

        UserModel = mongoose.model('user', UserSchema);
        console.log('UserModel이 정의되었습니다.');


    });
};


//회원가입
// localhost:3000/user/regist (post)
router.route('/user/regist').post((req, res) => {
    console.log('/user/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const gender = req.body.gender;
    console.log(`userid:${userid}, userpw:${userpw}, username:${username}, gender: ${gender}`);

    if (database) {
        joinUser(database, userid, userpw, username, gender, (err, result) => {
            if (!err) {
                if (result) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 가입 성공</h2>');
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원 가입 실패</h2>');
                    res.end();
                }
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>서버에러,,,  회원가입 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
});

//로그인--------------------------------------------------------------------------
// localhost:3000/user/login (post)

router.route('/user/login').post((req, res) => {
    console.log('.user./login 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid: ${userid}, userpw:${userpw}`);

    if (database) {
        loginUser(userid, userpw, (err, result) => {
            if (!err) {
                if (result) {
                    // 로그인 객체 정보 출력
                    console.dir(result); // dir = 전달
                    const username = result[0].username;
                    const gender = result[0].gender;
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write(`<h2>로그인 성공!</h2>`);
                    res.write(`<p>아이디 : ${userid}</p>`);
                    res.write(`<p>이름 : ${username}</p>`);
                    res.write(`<p>성별 : ${gender}</p>`);
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>로그인 실패</h2>');
                    res.end();
                };
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>서버오류,,,  로그인 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }




});


// 회원리스트 가져오기
// localhost:3000/user/list (get)

router.route('/user/list').get((req, res) => {
    console.log('/user/list 호출 완료!');
    if (database) {
        UserModel.findAll((err, result) => {
            if (!err) {
                if (result) {

                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원리스트</h2>');
                    res.write('<div> <ul>');
                    for (let i = 0; i < result.length; i++) {
                        const userid = result[i].userid;
                        const username = result[i].username;
                        const gender = result[i].gender;
                        res.write(`<li>${i}: ${userid} / ${username} / ${gender}</li>`);
                    };
                    res.write('</ul></div>');

                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원정보가 없습니다</h2>');
                    res.end();
                }
            } else {
                console.log('리스트 조회 실패');
            }
        });

    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결실패</h2>');
        res.end();
    }
    UserList();
})






//joinUser ===============================================================================================
const joinUser = function (database, userid, userpw, username, gender, callback) {
    console.log('joinUser 함수 호출');
    const users = new UserModel({ userid: userid, userpw: userpw, username: username, gender: gender });
    users.save((err, result) => {
        if (!err) {
            console.log('회원 document가 추가되었습니다.');
            callback(null, result);
            return;
        }
        callback(err, null);

    });
}

const loginUser = function (userid, userpw, callback) {
    console.log('loginUser 함수 호출');
    UserModel.find({ userid: userid, userpw: userpw }, (err, result) => {
        if (!err) {
            if (result.length > 0) {
                console.log('일치하는 사용자를 찾음');
                callback(null, result);
            } else {
                console.log('일치하는 사용자를 찾을수 없음');
                callback(null, null);
            }
            return;
        }
        callback(err, null);
    });
};





app.use('/', router);

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
    connectDB(); // 데이터베이스를 연결 함수 호출
});
