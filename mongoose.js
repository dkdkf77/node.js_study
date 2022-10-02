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
let database;
let UserSchema;
let UserModel;



function connectDB() {
    const url = 'mongodb://127.0.0.1:27017/frontenddb01';
    console.log('데이터베이스 연결 시도중...')

    mongoose.Promise = global.Promise;
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
            if (err) {
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




app.use('/', router);

app.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행중...`);
    connectDB();
});
