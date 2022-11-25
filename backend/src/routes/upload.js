const express = require('express');
const multer = require('multer');
const { uploadFile,deleteFile,updateFile } = require('../service/uploadDriver')
const { uploadImage,imageFilter,storageImage,editImage,deleteImage } = require('../service/uploadFile');
const { uploadAudio,deleteAudio,audioFilter,storageAudio,editAudio } = require('../service/uploadAudio');
const routes = express.Router();

let upload = multer({fileFilter: imageFilter });
let uploadAudio1 = multer({ storage: storageAudio, fileFilter: audioFilter });

routes.post('/createImage',upload.single('image'),uploadFile, (req,res) => {
    return res.json({
        link: `https://drive.google.com/file/d/${req.fileUpload.id}/view`
    })
});
routes.post('/editImage',upload.single('image'),updateFile);
routes.post('/deleteFile',deleteFile);

routes.post('/create',uploadAudio1.single('audio'),uploadAudio,(req,res) => {
    return res.json({
        ... req.audio,
        body: req.body,
    });
});
routes.post('/edit',uploadAudio1.single('audio'),editAudio,(req,res) => {
    return res.json({
        ... req.audio,
        body: req.body,
    })
});
routes.post('/delete',deleteAudio);

module.exports = routes;