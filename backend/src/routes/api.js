const express = require('express');
const routes = express.Router();
const UserController = require('../app/controllers/UserController');

// domain/api
routes.post('/search', UserController.search);
routes.get('/users', UserController.getUsers);

module.exports = routes;