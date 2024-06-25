const { Router } = require('express');
const passport = require('passport');

const router = Router();

const { register, deleteUser, userLogout, changePassword, findPassword } = require('../services');

const { loginRequired, validateRegister, validatePassword } = require('../middlewares');

// 비밀번호 변경
// 비번 찾기는 스키마에 isPasswordChanged를 추가해야 함.
router.put('/', loginRequired, validatePassword, changePassword);

// 회원 탈퇴
router.delete('/', loginRequired, deleteUser, userLogout);

// 회원 가입
router.post('/join', validateRegister, register);

// 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
    })(req, res, next);
})
// 로그아웃
router.post('/logout', loginRequired, userLogout);

module.exports = router;