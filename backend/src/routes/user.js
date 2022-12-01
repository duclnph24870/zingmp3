const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');
const AuthMiddleware = require('../app/middlewares/auth');

routes.post('/signUp', UserController.signUp);
routes.get('',AuthMiddleware.checkSignIn,UserController.getUser);
routes.get('/:slug',UserController.selectUser);
routes.post('/signIn',UserController.signIn);
routes.post('/refreshToken',UserController.createRefreshToken);

module.exports = routes;