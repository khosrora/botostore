const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/user');
const { SECRET_KEY } = require('./constance');

function randomNumberGenerator() {
    return Math.floor((Math.random() * 90000) + 10000)
}

function signAccessToken(userId) {
    return new Promise(async (resolve, reject) => {
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone,
            userID: user._id
        };
        const secret = SECRET_KEY;
        const option = {
            expiresIn: "1h"
        };
        jwt.sign(payload, secret, option, (err, token) => {
            if (err) reject(createError.InternalServerError("لطفا دوباره امتحان کنید"));
            resolve(token)
        })
    })
}




module.exports = {
    randomNumberGenerator,
    signAccessToken
}