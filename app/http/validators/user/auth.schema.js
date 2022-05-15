const joi = require('@hapi/joi');
const getOtpSchema = joi.object({
    phone: joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره تماس خود را چک کنید"))
});
const checkOtpSchema = joi.object({
    phone: joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره تماس خود را چک کنید")),
    code: joi.string().min(4).max(6).error(new Error("کد وارد شده صحیح نمی باشد"))
});

module.exports = {
    getOtpSchema,
    checkOtpSchema
}