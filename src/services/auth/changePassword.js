const bcrypt = require('bcrypt');

const { userModel } = require('../../db/models');
const { ValidationError } = require('../../utils/customError');
// 비밀번호 변경
const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const isPasswordCorrect = await bcrypt.compare(oldPassword, req.user.password);
        if (!isPasswordCorrect) {
            throw new ValidationError('비밀번호가 틀렸습니다.');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await userModel.updateById(req.user.userId, { password: hashedPassword });
        await userModel.updateResetFalse(req.user.userId);
        
        return res.status(204).end();
    } catch(err) {
        return next(err);
    }
}

module.exports = changePassword;