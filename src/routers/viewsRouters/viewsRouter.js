const express = require('express');

const { loggedInRedirect } = require('../../middlewares');
const { serveStatic } = require('../../services');

const router = express.Router();
// 비로그인 상태면 로그인 페이지로
// 로그인 상태면 유저 개인 페이지로 이동
router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    // 로그인 했을 때 비밀번호 찾기를 이용한 상태면 비밀번호 변경 페이지로 이동
    // 비밀번호 찾기 기능 구현되면 주석 풀어주기
    // if (req.user.resetPassword) {
    //     return res.redirect('passwordChangePage');
    // }
    return res.redirect(`/users/${req.user.userId}`);
});
// 로그인 된 상태면 비로그인 전용 페이지를 띄우지 않고 유저 개인 페이지로 리다이렉트
router.use('/login', loggedInRedirect, serveStatic('login'));

router.use('/join', loggedInRedirect, serveStatic('join'));

router.use('/pwfind', loggedInRedirect, serveStatic('pwfind'));

module.exports = router;