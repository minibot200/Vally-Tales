const { Router } = require('express');

const { serveStatic, loginRequired } = require('../../services');

const router = Router();

router.use(loginRequired);

router.get('/users', serveStatic('users'));

module.exports = router;