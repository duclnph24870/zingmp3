const express = require('express');
const routes = express.Router();
const PlayListController = require('../app/controllers/PlayListController');
const multer = require('multer');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.get('/:id',PlayListController.selectPlayList);
routes.post('/create',uploadImage.single('image'),PlayListController.createPlaylist);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,PlayListController.editPlaylist);
routes.post('/delete',PlayListController.deletePlaylist);

module.exports = routes;