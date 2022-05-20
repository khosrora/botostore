const { homeRoutes } = require('./api');
const { UserAuthRoutes } = require('./user/auth');
const { developerRoutes } = require('./developer.routes');
const { adminRoutes } = require('./admin.routes');

const router = require('express').Router();

router.use('/developer', developerRoutes);
router.use('/admin', adminRoutes);
router.use('/user', UserAuthRoutes);
router.use('/', homeRoutes);

module.exports = { AllRoutes: router }