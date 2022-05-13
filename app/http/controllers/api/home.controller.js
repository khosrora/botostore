const { Controller } = require("../Controller");



module.exports = new class HomeController extends Controller {
    indexPage(req, res, next) {
        return res.status(200).send("index page store")
    }
}