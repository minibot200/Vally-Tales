const express = require('express');

const { serveStatic } = require('../services');

const privateRouter = require('./privateRouter');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.user) {
        return res.redirect('/login');
    }
    return res.redirect('/users');
});
router.use('/login', serveStatic('login'));
router.use('/join', serveStatic('join'));

router.use(privateRouter);

module.exports = router;