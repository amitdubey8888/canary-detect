const express = require('express');
const routes = express.Router();

const userRoutes = require('./user.routes');
const pdfRoutes = require('./pdf.routes');

routes.use('/user', userRoutes);
routes.use('/pdf', pdfRoutes);

module.exports = routes;