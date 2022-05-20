const router = require('express').Router();
const { CategoryRoutes } = require('./admin/category');

/**
 * @swagger
 *  tags:
 *     -  name: Admin-Panel
 *     -  name: Category(Admin-Panel)
*/
router.use("/category", CategoryRoutes)

module.exports = {
    adminRoutes: router
}