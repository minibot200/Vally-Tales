const { userModel } = require('../db/models');

const deleteUser = async (req, res, next) => {
    const { shortId } = req.user;
    await userModel.deleteById(shortId);
    next();
}

module.exports = deleteUser;