const { userModel, awardModel } = require('../../db/models');

const getAllAwards = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const author = await userModel.findById(userId);
        const allAwards = await awardModel.find({ author });
        const data = allAwards.map(award => ({
            title: award.title,
            organization: award.organization,
            date: award.date,
            createdAt: award.createdAt,
            updatedAt: award.updatedAt,
            awardId: award.awardId,
        }));
        return res.json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = getAllAwards;