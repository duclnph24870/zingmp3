const express = require('express');
const multer = require('multer');
const routes = express.Router();
const CategoryController = require('../app/controllers/CategoryController');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.post('/create',uploadImage.single('image'),uploadDriver.uploadFile,CategoryController.createCategory);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,CategoryController.editCate);
routes.post('/delete',CategoryController.deleteCategory);
routes.get('/:slug',CategoryController.select);

module.exports = routes;