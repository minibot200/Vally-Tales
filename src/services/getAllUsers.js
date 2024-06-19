const { userModel } = require('../db/models');

const getAllUsers = async (req, res) => {
    const allUsers = await userModel.find();
    const data = allUsers.filter(user => !user.deletedAt).map(user => ({
        name: user.name,
        email: user.email,
        description: user.description,
    }));
    return res.json(data);
}

module.exports = getAllUsers;