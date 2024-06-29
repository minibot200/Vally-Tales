const { awardModel } = require('../../db/models');

const editAward = async (req, res, next) => {
    const { awardId } = req.params;
    const foundAward = await awardModel.findOne({ awardId });
    if (!foundAward) {
        const err = new Error('존재하지 않는 수상 정보입니다.');
        err.statusCode = 404;
        next(err);
        return;
    }
    const { title, organization, date } = req.body;
    const updatedAward = await awardModel.findOneAndUpdate({ awardId }, { title, organization, date }, {new: true});
    return res.json({
        title: updatedAward.title,
        organization: updatedAward.organization,
        date: updatedAward.date,
        createdAt: updatedAward.createdAt,
        updatedAt: updatedAward.updatedAt,
        awardId: updatedAward.awardId,
    });
}

module.exports = editAward;