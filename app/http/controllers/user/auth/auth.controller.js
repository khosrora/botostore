const createError = require("http-errors")
const { authSchema } = require("../../../validators/user/auth.schema")



module.exports = new class AuthController {
    async login(req, res, next) {
        try {
            const result = await authSchema.validateAsync(req.body);
            console.log(result);
            return res.status(200).send("خوش آمدید")
        } catch (error) {
            next(createError.BadRequest(error.message))
        }
    }
}