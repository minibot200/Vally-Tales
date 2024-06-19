// app.js

// 필요한 모듈 불러오기
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

// Express 애플리케이션 생성
const app = express();

// 미들웨어 설정
app.use(morgan('dev')); // HTTP 요청 로깅
app.use(bodyParser.json()); // JSON 요청 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱
app.use(cors()); // CORS 설정

// 데이터베이스 연결
const dbURI = 'mongodb://localhost:27017/webDB';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('테스트 텍스트');
});

// 라우터 설정 (예: 사용자 관련 라우트)
const userRouter = require('./routes/user');
app.use('/users', userRouter);

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// 애플리케이션 객체 내보내기
module.exports = app;
