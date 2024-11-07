const { InternalServalError } = require('../../utils/customError');
// 로그아웃
const userLogout = (req, res) => {
    req.logout((err) => {
		req.session.destroy();
		if (err) {
			throw new InternalServalError('로그아웃 중 문제가 발생하였습니다.');
		} else {
			return res.status(204).end();
		}
	});
}

module.exports = userLogout;