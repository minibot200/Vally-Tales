const { Router } = require('express');
const passport = require('passport');

const router = Router();

const { register, loginRequired, deleteUser, userLogout } = require('../services');

// 비밀번호 변경
// 회원 탈퇴
router.delete('/', loginRequired, deleteUser, userLogout);

// 회원 가입
router.post('/join', register);

// 로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true,
    })(req, res, next);
})

router.post('/logout', loginRequired, userLogout);

module.exports = router;