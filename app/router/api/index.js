const homeController = require('../../http/controllers/api/home.controller');

const router = require('express').Router();


/**
 * @swagger
 * http://localhost:5000/:
 *  get:
 *      symmery: index of routes
 *      tags: [indexPage]
 *      description: get all need data for index page
 *      responses: 
 *          200:
 *              description: success
 *          404: 
 *              description: notFound
 */

router.get("/", homeController.indexPage);


module.exports = { homeRoutes: router };