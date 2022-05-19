const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constance");
const createError = require('http-errors');
const { UserModel } = require("../../models/user");
const jwt = require('jsonwebtoken');

function verifyAccessToken(req, res, next) {
    const headers = req.headers;
    const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
    const secret = ACCESS_TOKEN_SECRET_KEY;
    if (token && bearer?.toLowerCase() === "bearer") {
        jwt.verify(token, secret, async (err, payload) => {
            if (err) return next(createError.Unauthorized("لطفا وارد وب سایت شوید"))
            const { phone } = payload || {};
            const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
            if (!user) return next(createError.Unauthorized("حساب کاربری یافت نشد"));
            req.user = user;
            return next();
        });
    }
    else return next(createError.Unauthorized("لطفا وارد وب سایت شوید"))
}


module.exports = {
    verifyAccessToken
}