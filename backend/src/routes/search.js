const express = require('express');
const routes = express.Router();
const SearchController = require('../app/controllers/SearchController');

routes.get('',SearchController.get)

module.exports = routes;