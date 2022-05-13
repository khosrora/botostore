const { homeRoutes } = require('./api');

const router = require('express').Router();

router.use('/', homeRoutes)

module.exports = { AllRoutes: router }