const fs = require('fs'); //파일을 다루는 모듈

//fs.readFile('파일명','utf-8', 함수(){});
//비동기식 
fs.readFile('text1.txt','utf-8', (err,data)=>{//예외 처리
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음 : ${data}`);
    }
});

//동기식 -> 비동기식 보다 동기식이 더 빠르게 처리 된다

const text = fs.readFileSync('text1.txt','utf-8');
console.log(`동기식으로 읽음 : ${text}`);
