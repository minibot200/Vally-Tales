const { Router } = require('express');

const { serveStatic } = require('../../services');

const { loginRequired } = require('../../middlewares');

const router = Router();

router.use(loginRequired);

router.use('/users', serveStatic('users'));

router.use('/users/:userId', serveStatic('user'));

router.use('/pwchange', serveStatic('pwchange'));

module.exports = router;