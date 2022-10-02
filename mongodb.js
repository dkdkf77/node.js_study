const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs')

//npm i mongodb
const MongoClient = require('mongodb').MongoClient;


const app = express();
const port = 3000;
const router = express.Router();


app.use(bodyParser.urlencoded({ extended: false }));

let database; // 몽고디비 연결 객체

//mongodb 연결 함수
function connectDB() {
    const databaseURL = "mongodb://localhost:27017";//몽고디비 프로토콜
    MongoClient.connect(databaseURL, (err, db) => {
        if (!err) {
            const tempdb = db.db('frontenddb01');
            // 접근하고자 하는 데이터베이스의 이름
            database = tempdb; // 연결된 데이터베이스를 database에 저장
            console.log('mongodb 데이터베이스 연결 성공!');
        } else {
            console.log(err);
        }
    });

};

//회원가입 포스트맨 사용
//http://localhost:3000/member/regist
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const username = req.body.username;
    const userage = req.body.userage;

    console.log(`userid:${userid},userpw:${userpw},username:${username},userage:${userage}`);

    if (database) {// 데이터베이스가 생성되고 연결이 되었는지 확인
        joinMember(database, userid, userpw, username, userage, (err, result) => {
            if (!err) {// 회원가입 함수 연결여부 확인
                if (result.insertedCount > 0) { //오류는 아니지만 회원가입이 안되는 경우
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다</p>');
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원가입 실패(콜백)</h2>');
                    res.write('<p>가입에 실패되었습니다</p>');
                    res.end();
                }
            } else {// 회원가입 함수에 오류가 발생시
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>회원가입 실패(함수)</h2>');
                res.write('<p>오류가 발생했습니다.</p>');
                res.end();
            }
        });
    } else {//데이터 베이스 연결 실패시 화면에 출력
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }

})





//로그인
//http://localhost:3000/member/login (post)
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid:${userid}, userpw:${userpw}`);

    if (database) {
        //데이터베이스에 연결이 성공했을때 실행함수 호출;
        loginMember(database, userid, userpw, (err, result) => {//싱행할 함수연결에 대한 예외처리
            if (!err) { // 함수 연결 성공시
                if (result) { // 리턴된 result값의 발생 여부에 대한 조건


                    //console.log(result);  커멘드창 속성값 출력
                    console.dir(result); // 속성값 전달
                    const resultUserid = result[0].userid; // 데이터 베이스 값이 아닌 로그인 member안 함수 값에서 처리된 값을 가져와서 0번째 라고 하시는데 뭔 말이지?
                    const resultUserpw = result[0].userpw;
                    const resultUsername = result[0].username;
                    const resultUserage = result[0].userage;

                    //로그인 성공시 화면에 출력할 내용
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>로그인 성공</h2>')
                    res.write(`<p>${resultUserid}(${resultUserid})님 환영합니다</p>`);
                    res.write(`<p>나이: ${resultUserage}</p>`);
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>아이디 또는 비밀번호를 확인하세요</p>');
                    res.end();
                }
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>서버 오류 발생, 로그인 실패했습니다</p>');
                res.end();
            }

        });
    } else {
        //함수 연결 실패시
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    };
});




//정보 수정
//http://localhost:3000/member/edit (post)

router.route('/member/edit').post((req, res) => {
    console.log('/member/edit 호출!');
    const userid = req.body.userid; //데이터베이스 찾기하는 키값
    const userpw = req.body.userpw;
    const username = req.body.username;
    const userage = req.body.userage;

    console.log(`userid:${userid},userpw:${userpw},username:${username},userage:${userage}`);
    if (database) {
        editMember(database, userid, userpw, username, userage, (err, result) => {
            if (!err) {
                if (result.modifiedCount > 0) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원정보 수정 성공!</h2>');
                    res.write('<p>회원정보 수정 성공했습니다</p>');
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>회원정보 수정 실패!</h2>');
                    res.write('<p>회원정보 수정에 실패하였습니다</p>');
                    res.end();
                }
            } else {
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>회원정보 수정 실패!</h2>');
                res.write('<p>서버 오류 발생 ,,,정보 수정에 실패하였습니다</p>');
                res.end();
            };
        });
    } else {
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    };



});







//회원 삭제
//http://localhost:3000/member/delete (post)
router.route('/member/delete').post((req, res) => {
    console.log('/memeber/delete 호출');
    const userid = req.body.userid;
    console.log(`userid:${userid}`);

    if (database) {
        deleteMember(database, userid, (err, result) => {
            if (!err) {
                if (result.deletedCount > 0) {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>데이터베이스 삭제 성공</h2>');
                    res.write('<p>mongodb 데이터베이스에 회원삭제에 성공하였습니다.</p>');
                    res.end();
                } else {
                    res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                    res.write('<h2>데이터베이스 삭제 실패</h2>');
                    res.write('<p>회원삭제에 실패하였습니다.</p>');
                    res.end();
                }
            } else {
                //데이터 베이스 데이터 에러발생시 화면에 출력
                res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
                res.write('<h2>데이터베이스 삭제 실패</h2>');
                res.write('<p>mongodb 데이터베이스에 회원삭제에 실패하였습니다.</p>');
                res.end();
            }
        });
    } else {
        //데이터 베이스 연결 실패
        res.writeHead('200', { 'content-type': 'text/html;charset=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }

});



//회원가입------------------------------------------------------------------------------------------------------------------------------------------
const joinMember = function (database, userid, userpw, username, userage, callback) {
    console.log('joinMember 호출!');
    const members = database.collection('member');// 몽고디비 안에서 컬렉션을 객체로 가져옴
    //members.insertMany()컬렉션을 저장 -> 하나만 들고오더라도 배열로 값이 저장 
    members.insertMany([{ userid: userid, userpw: userpw, username: username, userage: userage }], (err, result) => {
        if (!err) { // db에 객체를 저장하는 과정에 대한 예외 처리;
            //정상적 데이터 입력에 대한 메시지를 전달 
            if (result.insertedCount > 0) {// 한개이상이 저장이 되므로 0보다 크면 정상으로 저장이 되었다로 으미ㅣ
                console.log(`사용자 document ${result.insertedCount}명 추가 되었음!`);
            } else {
                console.log(`사용자 document 추가되지 않음!`); // 회원 가입시 여러가지 정보 중 하나를 빠뜨렸을때 줄 수 있는 예외 처리 
            }
            callback(null, result); // 에러가 발생되지 않으면 결과 값을 출력 err => null
        } else {// 에러가 발생했을때 
            console.log(err);
            callback(err, null); // 함수를 호출해서 리턴해서 받을때 에러가 발생되면 err 값은 받고 result 값은 빈값으로 null로 출력
        }
    });
};
//로그인-------------------------------------------------------------------------------------------------------------------------------------------
const loginMember = function (database, userid, userpw, callback) {
    console.log('loginMember 호출!');
    const members = database.collection('member'); // 데이터 베이스 안에 있는 member 컬렉션 연결
    members.find({ userid: userid, userpw: userpw }).toArray((err, result) => {
        if (!err) {//find를 위한 예외처리
            if (result.length > 0) {
                console.log('사용자를 찾았습니다');
                callback(null, result);
            } else {
                callback(null, null);
                console.log('사용자가 없습니다');
            }
            return;
        } else {
            console.log(err);
            callback(err, null);
        }
    });

}

//회원수정 =============================================================================
const editMember = function (database, userid, userpw, username, userage, callback) {
    console.log('editMember 호출');
    const members = database.collection('member');

    members.updateOne({ userid: userid }, { $set: { userid: userid, userpw: userpw, username: username, userage: userage } }, (err, result) => {
        if (!err) {
            if (result.modifiedCount > 0) {
                console.log(`사용자 document ${result.modifiedCount}명 수정됨`);
            } else {
                console.log('수정된 document 없음');
            }
            callback(null, result);
            return;
        } else {
            console.log(err);
            callback(err, null);
        };
    });
};

// 회원삭제 ===============================================================================
const deleteMember = function (database, userid, callback) {
    console.log('deleteMember 호출')
    const members = database.collection('member');
    members.deleteOne({ userid: userid }, (err, result) => {
        if (!err) {
            if (result.deletedCount > 0) {
                console.log(`사용자 document ${result.deletedCount}명 삭제됨`)
            } else {
                console.log('삭제된 document 없음');
            }
            callback(null, result);
            return;
        } else {
            console.log(err);
            callback(err, null);
        };
    });
};


app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중....`);
    connectDB();// 몽고디비연겨러함수 -> 호출 -> db연결
});