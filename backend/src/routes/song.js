const express = require('express');
const routes = express.Router();
const SongController = require('../app/controllers/SongController');
const multer = require('multer');
const uploadDriver = require('../service/uploadDriver');
let uploadAudio = multer({ fileFilter: uploadDriver.audioFilter });
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });
const checkAuth = require('../app/middlewares/auth');

// Lấy ra danh sách phát
routes.get('/songPlayList',SongController.getSongPlayList);

routes.get('/:id',SongController.selectSong);
routes.post('/create',uploadAudio.single('audio'),SongController.createSong);
// chỉ cho sửa hình ảnh không cho sửa audio
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,SongController.editSong);
routes.post('/delete',SongController.deleteSong);
// thích bài hát
routes.post('/like/:songId',checkAuth.checkSignIn,SongController.likeSong);
// tính lượt nghe bài hát
routes.post('/counter/:songId',SongController.counterSong);

module.exports = routes;