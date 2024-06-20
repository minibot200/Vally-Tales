const passport = require('passport');

const local = require('./strategies/localStrategy');
const { userModel } = require('../db/models');  // 아직 미작성.

module.exports = () => {
    passport.use(local);

    passport.serializeUser((user, done) => {
        done(null, user.shortId);
    });

    passport.deserializeUser(async (shortId, done) => {
        const user = await userModel.findById(shortId);
        done(null, user);
    });
};