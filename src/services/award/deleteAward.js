const { awardModel } = require('../../db/models');

const deleteAward = async (req, res, next) => {
    const { awardId } = req.params;
    const foundAward = await awardModel.findOne({ awardId });
    // 없으면 삭제 안되게 ㄱㄱ
    if (!foundAward) {
        const err = new Error('없는 데이터');
        err.statusCode = 404;
        next(err);
        return;
    }
    if (!!foundAward.deleteAt) {
        const err = new Error('이미 삭제된 데이터');
        err.statusCode = 409;
        next(err);
        return;
    }
    const deletedAward = await awardModel.findOneAndUpdate({ awardId }, { deletedAt: Date.now() }, { new: true });
    if (!deletedAward.deletedAt) {
        const err = new Error('삭제가 잘 안되네요...');
        next(err);
        return;
    }
    return res.status(204).json("삭제 성공");
}

module.exports = deleteAward;