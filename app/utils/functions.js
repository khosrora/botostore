const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/user');
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('./constance');
const redisClient = require('./init_redis');

function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone,
        };
        const secret = ACCESS_TOKEN_SECRET_KEY;
        const option = {
            expiresIn: "1h"
        };
        jwt.sign(payload, secret, option, (err, token) => {
            if (err) reject(createError.InternalServerError("لطفا دوباره امتحان کنید"));
            resolve(token)
        })
    })
}

function signRefreshToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone,
        };
        const secret = REFRESH_TOKEN_SECRET_KEY;
        const option = {
            expiresIn: "1y"
        };
        jwt.sign(payload, secret, option, async (err, token) => {
            if (err) reject(createError.InternalServerError("لطفا دوباره امتحان کنید"));
            await redisClient.SETEX(userId.toString(), (365 * 24 * 60 * 60), token);
            resolve(token)
        })
    })
}


function verifyRefreshToken(token) {
    const secret = REFRESH_TOKEN_SECRET_KEY;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, async (err, payload) => {
            if (err) reject(createError.Unauthorized("لطفا وارد وب سایت شوید"))
            const { phone } = payload || {};
            const user = await UserModel.findOne({ phone }, { password: 0, otp: 0 });
            if (!user) reject(createError.Unauthorized("حساب کاربری یافت نشد"));
            console.log(user);
            const refreshToken = await redisClient.get(user?._id.toString() || "default_key");
            if (!refreshToken) reject(createError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
            if (token === refreshToken) return resolve(phone);
            reject(createError.Unauthorized("حساب کاربری یافت نشد"));
        });
    })
}





module.exports = {
    randomNumberGenerator,
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}