const express = require('express');
const routes = express.Router();

const userRoutes = require('./user.routes');
const formRoutes = require('./form.routes');

routes.use('/user', userRoutes);
routes.use('/form', formRoutes);

module.exports = routes;