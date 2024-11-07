const { Router } = require('express');

const { serveStatic } = require('../../services');

const { loginRequired } = require('../../middlewares');

const router = Router();
// 로그인을 필수로 만드는 미들웨어를 배치
// 이후로 거치는 모든 라우터는 로그인 필수가 됨
router.use(loginRequired);

router.use('/users', serveStatic('users'));

router.use('/users/:userId', serveStatic('user'));

router.use('/pwchange', serveStatic('pwchange'));

module.exports = router;