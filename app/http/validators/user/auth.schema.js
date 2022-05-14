const joi = require('@hapi/joi');
const authSchema = joi.object({
    phone: joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره تماس خود را چک کنید"))
});

module.exports = {
    authSchema
}