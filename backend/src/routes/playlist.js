const express = require('express');
const routes = express.Router();
const PlayListController = require('../app/controllers/PlayListController');

routes.get('/:id',PlayListController.selectPlayList);

module.exports = routes;