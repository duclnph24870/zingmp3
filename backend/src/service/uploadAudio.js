const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs-extra');
const appRoot = require('app-root-path');

const upload = multer().single('audio');
// tạo 1 storage để lưu file
const storageAudio = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot +'/src/asset/audio/');
    },
    // đặt lại tên file và bổ xung đuôi chi file vì đuôi đã bị xóa
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// func để validate file
const audioFilter = function(req, file, cb) {
    // Accept images only
    // cb dùng để truyền vào mess lỗi khi có lỗi xảy ra
    if (!file.originalname.match(/wav|mp3|flac/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    // cb truyền vào true sẽ tự thoát hàm
    cb(null, true);
};


// [POST] /create
const uploadAudio = (_req,res,next) => {
    let req = _req;
    let body = {
        ... _req.body
    }
    upload(req, res, function(err) {

        if (req.fileValidationError) {
            // lỗi validate file
            return res.json(req.fileValidationError);
        }
        else if (!req.file) {
            // lỗi chưa chọn file
            return res.json('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            // lỗi thư viện
            return res.json({
                err
            })
        }

        _req.audio = {
            audioLink: process.env.BACKEND_LINK + '/audio/' + req.file.filename,
            audioName: req.file.filename,
        };
        _req.body = body;
        next();
    })
}

// [POST] /edit
const editAudio = async  (_req,res,next) => {
    // xóa bỏ image cũ
    const audioName = _req.body.audioName;
    const pathAudio = appRoot + '/src/asset/audio/' + audioName;
    await fs.remove(pathAudio);
    // check xong rồi bắt đầu xóa image cũ 
    let req = _req;
    let body = {
        ... _req.body
    }
    upload (req,res, function (err) {
        if (req.fileValidationError) {
            // lỗi validate file
            return res.json(req.fileValidationError);
        }
        else if (!req.file) {
            // lỗi chưa chọn file
            return res.json('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            // lỗi thư viện
            return res.json({
                err
            })
        }

        _req.audio = {
            audioLink: process.env.BACKEND_LINK + '/audio/' + req.file.filename,
            audioName: req.file.filename,
        }
        _req.body = body;
        next();
    });
    
}

// [POST] delete
const deleteAudio = async (req,res,next) => {
    const audioName = req.body.audioName;
    const pathAudio = appRoot + '/src/asset/audio/' + audioName;
    await fs.remove(pathAudio);
    next();
}

module.exports = {
    uploadAudio,
    audioFilter,
    storageAudio,
    deleteAudio,
    editAudio
}