const fs = require('fs');

//비동기 처리는 예외처리를 할 필요가 없습니다.
fs.readFile('text11.txt', 'utf-8', (err, data) => {
    if(!err){
        console.log(data);
    }else{
        console.log('err 발생!/ 비동기');
    }
});




//동기식
try{
    const text = fs.readFileSync('text11.txt', 'utf-8');// 동기
    console.log(`동기식으로 읽음: ${text}`)
}catch(e){
    console.log('err 발생!/ 동기');
}

