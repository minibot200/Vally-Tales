const userLogout = (req, res) => {
    req.logout((err) => {
		req.session.destroy();
		if (err) {
			return res.status(500).json({error: "로그아웃이 안되네?"});
		} else {
			return res.redirect('/');
		}
	});
}

module.exports = userLogout;