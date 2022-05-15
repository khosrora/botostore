const router = require('express').Router();

// ? controller
const authController = require('../../http/controllers/user/auth/auth.controller');


/**
 * @swagger
 * /user/get-otp:
 *  post:
 *      summery: login user
 *      tags: [authenticated]
 *      description: login user with otp
 *      parameters:
 *      -   name: phone
 *          description:  fa-IRI phonenumber
 *          in: formData
 *          required: true
 *          type: string
 *      responses: 
 *          201:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.post("/get-otp", authController.getOtp);

/**
 * @swagger
 * /user/check-otp:
 *  post:
 *      summery: check otp user
 *      tags: [authenticated]
 *      description: get otp & phone and send access token to client
 *      parameters:
 *      -   name: code
 *          description:  user-number
 *          in: formData
 *          required: true
 *          type: string
 *      -   name: phone
 *          description:  fa-IRI phonenumber
 *          in: formData
 *          required: true
 *          type: string
 *      responses: 
 *          201:
 *              description: Success
 *          400: 
 *              description: Bad request
 *          401:
 *              description: Unauthorization
 *          500:
 *              description: Internal server error
 */
router.post("/check-otp", authController.chckOtp);


module.exports = { UserAuthRoutes: router };