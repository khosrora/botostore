const router = require('express').Router();
const bcrypt = require('bcrypt');
const { randomNumberGenerator } = require('../utils/functions');


/**
 * @swagger
 * /developer/password-hash/{password}:
 *  get:
 *      summery: create hash password  
 *      tags: [developer routes]
 *      description: developer Utils for developers
 *      parameters:
 *      -   in: path
 *          required : true 
 *          type : string 
 *          name : password
 *      responses: 
 *          200:
 *              description: Success
 */
router.get("/password-hash/:password", (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password, salt));
})

/**
 * @swagger
 * /developer/random-number:
 *  get:
 *      summery: get random number  
 *      tags: [developer routes]
 *      description: random number for developers
 *      responses: 
 *          200:
 *              description: Success
 */
router.get("/random-number", (req, res, next) => {
    return res.send(randomNumberGenerator().toString());
})

module.exports = {
    developerRoutes: router
}