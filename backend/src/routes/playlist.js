const express = require('express');
const routes = express.Router();
const PlayListController = require('../app/controllers/PlayListController');
const auth = require('../app/middlewares/auth');

routes.post('/create',auth.checkSignIn,PlayListController.createPlaylist);
routes.post('/edit/:idPlaylist',auth.checkSignIn,PlayListController.editPlaylist);
routes.post('/delete/:idPlaylist',auth.checkSignIn,PlayListController.deletePlaylist);
routes.post('/action/:idPlaylist',auth.checkSignIn,PlayListController.actionSongPlaylist);
routes.get('/likedList',auth.checkSignIn,PlayListController.selectLikedList);
routes.get('/:id',PlayListController.selectPlayList);

module.exports = routes;