const { Router } = require('express');

const { getAllUsers, getUser } = require('../services');

const router = Router();

router.get('/', getAllUsers);

router.get('/:userId', getUser);

module.exports = router;