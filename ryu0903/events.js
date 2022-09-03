const events = require('events');
const { emit } = require('process');

//이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체를 생성
const eventEmitter = new events.EventEmitter();

const connectHandler = function(){
    console.log('연결 성공!');
    eventEmitter.emit('data_received'); //data_received 발생
}
eventEmitter.on('data_received', () => {// 익명함수 실행
    console.log('데이터 수신');
});

eventEmitter.on('connection', connectHandler); //지정한 이벤트의 리스너를 발생했을때 실행할 함수 연결

eventEmitter.emit('connection'); //connection 발생