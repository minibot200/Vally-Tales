const loggedInRedirect = (req, res, next) => {
    if (!!req.user) {
        return res.redirect(`/users/${req.user.userId}`);
    }
    return next();
}

module.exports = loggedInRedirect;