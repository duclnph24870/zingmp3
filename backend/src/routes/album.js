const express = require('express');
const multer = require('multer');
const routes = express.Router();
const AlbumController = require('../app/controllers/AlbumController');
const { uploadImage,imageFilter,storageImage,editImage,deleteImage } = require('../service/uploadFile');
let upload = multer({ storage: storageImage, fileFilter: imageFilter });


routes.get('/:slug',AlbumController.selectAlbum);
routes.post('/create',upload.single('image'),uploadImage,AlbumController.createAlbum);
routes.post('/edit',upload.single('image'),editImage,AlbumController.editAlbum);

module.exports = routes;