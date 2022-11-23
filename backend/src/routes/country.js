const express = require('express');
const routes = express.Router();
const CountryController = require('../app/controllers/CountryController');
const multer = require('multer');
const { uploadImage,imageFilter,storageImage,editImage,deleteImage } = require('../service/uploadFile');
let upload = multer({ storage: storageImage, fileFilter: imageFilter });

routes.post('/create',upload.single('image'),uploadImage,CountryController.createCountry);
routes.post('/delete',deleteImage,CountryController.deleteCountry);
routes.post('/edit',upload.single('image'),editImage,CountryController.editCountry);
routes.get('/',CountryController.selectCountry);

module.exports = routes;