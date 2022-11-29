const express = require('express');
const routes = express.Router();
const SongController = require('../app/controllers/SongController');

routes.get('/nextSong/:skipId',SongController.nextSong);
routes.get('/:slug',SongController.selectSong);

module.exports = routes;