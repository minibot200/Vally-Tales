const { userModel } = require('../../db/models');

const getAllUsers = async (req, res) => {
    // const { page, limit } = req.query;
    // 페이지네이션 구현되면 주석 해제
    // const { users, totalUsers } = await userModel.findAll(page, limit);
    const { users, totalUsers } = await userModel.findAll();
    const data = users.map(user => ({
        name: user.name,
        email: user.email,
        description: user.description,
        userId: user.userId,
        imageUrl: user.imageUrl,
    }));
    return res.json(data);
}

module.exports = getAllUsers;