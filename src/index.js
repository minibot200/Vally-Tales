//애플리케이션의 진입점
//서버 시작 및 포트 설정
//app.js에서 설정된 애플리케이션 객체를 불러와 실행

// index.js

// 필요한 모듈 불러오기
const app = require('./app'); // app.js에서 설정한 Express 애플리케이션 불러오기
const http = require('http');
const dotenv = require('dotenv');

// 환경 변수 설정
dotenv.config();

// 포트 설정 (환경 변수에서 가져오거나 기본값 사용)
const PORT = process.env.PORT || 3000;

// HTTP 서버 생성
const server = http.createServer(app);

// 서버 시작
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 서버 오류 처리
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;
    // 에러 핸들링
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
