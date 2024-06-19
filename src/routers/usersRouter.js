const { Router } = require('express');

const { getAllUsers, loginRequired } = require('../services');

const router = Router();

router.get('/', loginRequired, getAllUsers);

router.get('/mypage/:shortId', loginRequired, (req, res) => {
    res.send("making api");
});

module.exports = router;