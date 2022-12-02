const express = require('express');
const multer = require('multer');
const routes = express.Router();
const AuthorController = require('../app/controllers/AuthorController');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.get('/:slug',AuthorController.selectAuthor);
routes.post('/create',uploadImage.single('image'),AuthorController.createAuthor);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,AuthorController.editAuthor);
routes.post('/delete',AuthorController.deleteAuthor);

module.exports = routes;