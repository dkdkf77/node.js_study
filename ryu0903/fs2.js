const fs = require('fs');

const data = 'hello Node.js!!!';


//비동기식
fs.writeFile('text2.txt',data, 'utf-8', (err) => {
    if(!err){
        console.log('저장완료 / 비동기')
    }else{
        console.log('err 발생!')
    }
});

//동기식
fs.writeFileSync('text3.txt', data, 'utf-8');
console.log('저장완료!/ 동기');
