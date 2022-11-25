const express = require('express');
const multer = require('multer');
const routes = express.Router();
const AlbumController = require('../app/controllers/AlbumController');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.get('/:slug',AlbumController.selectAlbum);
routes.post('/create',uploadImage.single('image'),uploadDriver.uploadFile,AlbumController.createAlbum);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,AlbumController.editAlbum);
routes.post('/delete',AlbumController.deleteAlbum);

module.exports = routes;