const { userModel, awardModel } = require('../../db/models');

const addAward = async (req, res, next) => {
    const { title, organization, date } = req.body;
    const user = await userModel.findById(req.user.userId);
    const addedAward = await awardModel.create({
        author: user,
        title,
        organization,
        date,
    });
    if (!addedAward) {
        const err = new Error('추가가 왜 안 되는 거지');
        err.statusCode = 500;
        next(err);
        return;
    }
    return res.json({
        title: addedAward.title,
        organization: addedAward.organization,
        date: addedAward.date,
        createdAt: addedAward.createdAt,
        updatedAt: addedAward.updatedAt,
        awardId: addedAward.awardId,
    });
}

module.exports = addAward;