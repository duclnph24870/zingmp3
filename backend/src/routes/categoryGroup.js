const express = require('express');
const multer = require('multer');
const routes = express.Router();
const CategoryGroupController = require('../app/controllers/CategoryGroupController');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.post('/create',uploadImage.single('image'),CategoryGroupController.createCategoryGroup);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,CategoryGroupController.editCateGroup);
routes.post('/delete',CategoryGroupController.deleteCateGroup);
routes.get('/:slug',CategoryGroupController.select);

module.exports = routes;