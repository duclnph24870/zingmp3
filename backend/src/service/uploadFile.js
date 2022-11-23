const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs-extra');
const appRoot = require('app-root-path');

const upload = multer().single('image');
// tạo 1 storage để lưu file
const storageImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, appRoot +'/src/asset/image/');
    },
    // đặt lại tên file và bổ xung đuôi chi file vì đuôi đã bị xóa
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// func để validate file
const imageFilter = function(req, file, cb) {
    // Accept images only
    // cb dùng để truyền vào mess lỗi khi có lỗi xảy ra
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    // cb truyền vào true sẽ tự thoát hàm
    cb(null, true);
};


// [POST] /create
const uploadImage = (_req,res,next) => {
    let req = _req;
    let body = {
        ... _req.body
    }
    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

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

        // thành công
        // Display uploaded image for user validation
        // res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        // req.file === {
        //     "fieldname": "image",
        //     "originalname": "1.jpg",
        //     "encoding": "7bit",
        //     "mimetype": "image/jpeg",
        //     "destination": "C:\\Users\\minhkim\\Desktop\\Workspace\\du_an\\clone_zingmp3\\backend/src/asset/image/",
        //     "filename": "image-1669106377836.jpg",
        //     "path": "C:\\Users\\minhkim\\Desktop\\Workspace\\du_an\\clone_zingmp3\\backend\\src\\asset\\image\\image-1669106377836.jpg",
        //     "size": 261146
        // }
        _req.image = {
            imageLink: process.env.BACKEND_LINK + '/image/' + req.file.filename,
            imageName: req.file.filename,
        };
        _req.body = body;
        next();
    })
}

// [POST] /edit
const editImage = async  (_req,res,next) => {
    const noChangeImage = _req.body.noChangeImage;
    // xóa bỏ image cũ
    const imageName = _req.body.imageName;
    const pathImage = appRoot + '/src/asset/image/' + imageName;
    await fs.remove(pathImage);
    // check xong rồi bắt đầu xóa image cũ 
    let req = _req;
    let body = {
        ... _req.body
    }
    upload (req,res, function (err) {
        // không thay đổi ảnh
        console.log(noChangeImage);
        if (noChangeImage) {
            _req.body = body;
            return next();
        }
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

        _req.image = {
            imageLink: process.env.BACKEND_LINK + '/image/' + req.file.filename,
            imageName: req.file.filename,
        }
        _req.body = body;
        next();
    });
    
}

// [POST] delete
const deleteImage = async (req,res,next) => {
    const imageName = req.body.imageName;
    const pathImage = appRoot + '/src/asset/image/' + imageName;
    await fs.remove(pathImage);
    next();
}

module.exports = {
    uploadImage,
    imageFilter,
    storageImage,
    deleteImage,
    editImage
}