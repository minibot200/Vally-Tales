const userLogout = (req, res) => {
    req.logout();
    return res.redirect('/');
}

module.exports = userLogout;