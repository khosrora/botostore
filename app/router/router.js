const { homeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');

const router = require('express').Router();

router.use('/user', UserAuthRoutes)
router.use('/', homeRoutes)

module.exports = { AllRoutes: router }