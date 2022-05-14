const router = require('express').Router();

// ? controller
const authController = require('../../http/controllers/user/auth/auth.controller');




router.post("/login", authController.login);


module.exports = { UserAuthRoutes: router };