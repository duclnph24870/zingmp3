const express = require('express');
const routes = express.Router();
const CountryController = require('../app/controllers/CountryController');

routes.post('/create',CountryController.createCountry);

module.exports = routes;