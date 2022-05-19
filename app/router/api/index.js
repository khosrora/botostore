const homeController = require('../../http/controllers/api/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken');

const router = require('express').Router();


/**
 * @swagger
 * /:
 *  get:
 *      symmery: index of routes
 *      tags: [indexPage]
 *      description: get all need data for index page
 *      parameters :
 *          -   in: header
 *              name: access-token
 *              example: Bearer YourToken
 *      responses: 
 *          200:
 *              description: success
 *          404: 
 *              description: notFound
 */
router.get("/", verifyAccessToken, homeController.indexPage);


module.exports = { homeRoutes: router };