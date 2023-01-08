const express = require('express');
const routes = express.Router();
const PlayListController = require('../app/controllers/PlayListController');

routes.get('/:id',PlayListController.selectPlayList);
routes.post('/create',PlayListController.createPlaylist);
routes.post('/edit/:idPlaylist',PlayListController.editPlaylist);
routes.post('/delete/:idPlaylist',PlayListController.deletePlaylist);

module.exports = routes;