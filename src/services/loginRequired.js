// 로그인과 권한을 검사하는 함수
// 쿠키에서 세션 아이디가 있는지, 만료되지 않았는지 확인
// passport가 자동으로 하는가?

const loginRequired = (req, res, next) => {
    if (!req.user) {
        const err = new Error('로그인 필요');
        err.statusCode = 401;
        next(err);
    }
    next();
}

module.exports = loginRequired;