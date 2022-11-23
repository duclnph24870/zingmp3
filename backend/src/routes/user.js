const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');

routes.post('/signUp', UserController.signUp);

module.exports = routes;