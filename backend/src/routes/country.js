const express = require('express');
const routes = express.Router();
const CountryController = require('../app/controllers/CountryController');
const AuthMiddleware = require('../app/middlewares/auth');
const multer = require('multer');
const uploadDriver = require('../service/uploadDriver');
let uploadImage = multer({ fileFilter: uploadDriver.imageFilter });

routes.post('/create',uploadImage.single('image'),uploadDriver.uploadFile,CountryController.createCountry);
routes.post('/delete',CountryController.deleteCountry);
routes.post('/edit',uploadImage.single('image'),uploadDriver.updateFile,CountryController.editCountry);
routes.get('/',CountryController.selectCountry);

module.exports = routes;