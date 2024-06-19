const { Router } = require('express');

const { serveStatic, loginRequired } = require('../services');

const router = Router();

router.get('/users', loginRequired, serveStatic('users'));

module.exports = router;