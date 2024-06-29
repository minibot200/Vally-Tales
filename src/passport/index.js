const passport = require('passport');

const local = require('./strategies/localStrategy');
const { userModel } = require('../db/models');

module.exports = () => {
    passport.use(local); // 로그인 전략을 실행

    passport.serializeUser((user, done) => {
        done(null, user.userId); // 세션에 두 번째 인자를 저장, 최소한의 정보만
    });

    passport.deserializeUser(async (userId, done) => {
        const user = await userModel.findById(userId);
        done(null, user); // 세션에서 가져온 userId로 user정보 찾아서 req.user에 저장
    });
};