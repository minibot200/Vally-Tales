const { userModel } = require('../db/models');

const deleteUser = async (req, res, next) => {
    const { shortId } = req.user;
    await updateOne({ shortId }, {deletedAt: Date.now()});
    next();
}

module.exports = deleteUser;