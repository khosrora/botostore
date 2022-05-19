const { Controller } = require("../Controller");



module.exports = new class HomeController extends Controller {
    async indexPage(req, res, next) {
        try {
            return res.status(200).send("index page store")
        } catch (error) {
            next(error)
        }
    }
}