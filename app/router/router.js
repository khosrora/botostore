const redisClient = require('../utils/init_redis');
const { homeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');
const { developerRoutes } = require('./developer.routes');

const router = require('express').Router();

router.use('/developer', developerRoutes)
router.use('/user', UserAuthRoutes)
router.use('/', homeRoutes)

module.exports = { AllRoutes: router }