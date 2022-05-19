const createError = require("http-errors");
const { UserModel } = require("../../../../models/user");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constance");
const { randomNumberGenerator, signAccessToken, verifyRefreshToken, signRefreshToken } = require("../../../../utils/functions");
const { getOtpSchema, checkOtpSchema } = require("../../../validators/user/auth.schema");
const { Controller } = require("../../Controller");



module.exports = new class AuthController extends Controller {
    async getOtp(req, res, next) {
        try {
            await getOtpSchema.validateAsync(req.body);
            const { phone } = req.body;
            const code = randomNumberGenerator();
            const result = await this.saveUser(phone, code);
            if (!result) throw createError.Unauthorized("ورود موفقیت آمیز نبود")
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
                    code,
                    phone
                }
            })
        } catch (error) {
            next(createError.BadRequest(error))
        }
    }
    async chckOtp(req, res, next) {
        try {
            const { phone, code } = req.body;
            await checkOtpSchema.validateAsync(req.body);
            const user = await UserModel.findOne({ phone });
            if (!user) throw createError.NotFound("اطلاعات شما ثبت نشده است");
            if (user.otp.code !== +code) throw createError.Unauthorized("کد وارد شده صحیح نمی باشد");
            const now = Date.now();
            if (+user.otp.expiresIn <= now) throw createError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken , 
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const phone = await verifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({ phone });
            const accessToken = await signAccessToken(user._id);
            const newRefreshToken = await signRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async saveUser(phone, code) {
        const result = await this.checkExistUser(phone)
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        if (result) {
            return await this.updateUser(phone, { otp })
        };
        return !!(await UserModel.create({ phone, otp, roles: USER_ROLE }))
    }
    async checkExistUser(phone) {
        const user = await UserModel.findOne({ phone });
        return !!user;
    }
    async updateUser(phone, objectData = {}) {
        Object.keys(objectData).forEach(key => {
            if (["", " ", 0, undefined, null, undefined, "0", NaN].includes(objectData[key])) delete objectData[key]
        });
        const updateResult = await UserModel.updateOne({ phone }, {
            $set: objectData
        })
        return !!updateResult.modifiedCount;
    }
}