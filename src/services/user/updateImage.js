const { userModel } = require('../../db/models');
// aws s3 사용시 이용할 것
const updateImage = async (req, res, next) => {
    try {
        const imageUrl = req.file.location;
        const updatedUrl = await userModel.updateProfileImage(req.user.userId, imageUrl);
        return res.redirect(`/users/${req.user.userId}`);
    } catch(err) {
        return next(err);
    }
}

module.exports = updateImage;