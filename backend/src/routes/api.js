const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');

// /api
routes.get('/users', UserController.getUsers);

module.exports = routes;