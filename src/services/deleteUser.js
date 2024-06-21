const { userModel } = require('../db/models');

const deleteUser = async (req, res, next) => {
    const { userId } = req.user;
    await userModel.deleteById(userId);
    next();
}

module.exports = deleteUser;