const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');

routes.post('/signUp', UserController.signUp);
routes.get('/:slug',UserController.selectUser);
routes.post('/signIn',UserController.signIn);
routes.post('/refreshToken/:id',UserController.createRefreshToken);

module.exports = routes;