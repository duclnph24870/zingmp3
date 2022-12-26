const { google } = require('googleapis');
require('dotenv').config();
const { Stream } = require('stream');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const FOLDER_ID = process.env.FOLDER_ID;

const oau2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);
oau2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const driver = google.drive({
    version: 'v3',
    auth: oau2Client
});

// func để validate file image
const imageFilter = function(req, file, cb) {
    // Accept images only
    // cb dùng để truyền vào mess lỗi khi có lỗi xảy ra
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    // cb truyền vào true sẽ tự thoát hàm
    cb(null, true);
};

// func để validate file audio
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

// public file
const setFilePublic = async (fileId) => {
    try {
        await driver.permissions.create({
			fileId,
			requestBody: {
				role: "reader",
				type: "anyone",
			},
		});
		return driver.files.get({
			fileId,
			fields: "webViewLink,webContentLink",
		});
    } catch (error) {
        return {
            errCode: 1,
            message: 'Lỗi server',
            error
        };
    }
}

// upload file
const uploadFile = async (file) => {
    try {
        const bufferStream = new Stream.PassThrough();
		bufferStream.end(file.buffer);
		const createdFile = await driver.files.create({
			requestBody: {
				name: file.originalname,
				parents: [FOLDER_ID],
			},
			media: {
				body: bufferStream,
				/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
			},

			fields: "id",
		});
		await setFilePublic(createdFile.data.id);
		return createdFile.data.id;
    } catch (error) {
        return {
            errCode: 1,
            message: 'Lỗi server',
            error
        };
    }
} 

// delete file
const deleteFile = async (fileId) => {
	try {
		await driver.files.delete({
            fileId: [fileId]
        });
		return ({
            errCode: 0,
            message: `Xóa file ${fileId} thành công`
        });
	} catch (error) {
		return ({
            errCode: 1,
			message: "Không xóa được file",
            error,
		});
	}
};

// update file (khi fileId không tồn tại thì sẽ tạo mới ở update)
const updateFile = async (req,res,next) => {
    const file = req.file;
    const fileId = req.header.fileId || req.params.fileId || req.query.fileId;
    const idEdit = req.body.idEdit;
    if (!idEdit) {
        return res.status(500).json({
            errCode: 1,
            message: 'Không xác định được mục cần chỉnh sửa'
        });
    }
    if (fileId === 'noChangeFile') {
        return next();
    }
    if (!file || !fileId) {
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn vui lòng chọn file cần edit',
        })
    }
    try {

        const bufferStream = new Stream.PassThrough();
		bufferStream.end(file.buffer);
        const updateFile = await driver.files.update({
            fileId: [fileId],
            addParents: [FOLDER_ID],
            removeParents: [FOLDER_ID],
            requestBody: {
				name: file.originalname,
			},
			media: {
				body: bufferStream,
				/* file được upload lấy từ buffer đã được lưu trữ tạm thời trước đó */
			},
        });

        await setFilePublic(updateFile.data.id);
		req.fileUpdate = updateFile.data;
        return next();
    } catch (error) {
        if (error.code === 404) {
            const fileId = await uploadFile(file); 
            req.fileUpdate = { id: fileId };
            return next();
        }
        return res.status(500).json({
            errCode: 1,
            message: 'Update file không thành công',
            error
        });
    }
}

module.exports = {
    uploadFile,
    setFilePublic,
    deleteFile,
    updateFile,
    imageFilter,
    audioFilter
}