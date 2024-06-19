const passport = require('passport');

const local = require('./strategies/localStrategy');
const { userModel } = require('../db/models');  // 아직 미작성.

module.exports = () => {
    passport.use(local);

    passport.serializeUser((user, done) => {
        done(null, user.shortId);
    });

    passport.deserializeUser((shortId, done) => {
        userModel.findOne({ shortId }).then((err, user) => {
            done(null, user);
        });
    });
};