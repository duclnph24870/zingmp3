const express = require('express');
const routes = express.Router();
const SongController = require('../app/controllers/SongController');
const multer = require('multer');
const uploadDriver = require('../service/uploadDriver');
let uploadAudio = multer({ fileFilter: uploadDriver.audioFilter });
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.get('/nextSong/:skipId',SongController.nextSong);
routes.get('/:slug',SongController.selectSong);
routes.post('/create',uploadAudio.single('audio'),SongController.createSong);
// chỉ cho sửa hình ảnh không cho sửa audio
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,SongController.editSong);
routes.post('/delete',SongController.deleteSong);

module.exports = routes;