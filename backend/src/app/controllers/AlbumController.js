const AlbumModule = require('../modules/AlbumModule');
const uploadDriver = require('../../service/uploadDriver');

class AlbumController {
    // [GET] /album/:slug (json)
    async selectAlbum (req,res) {
        const slug = req.params.slug;
        let option = { slug };
        if (!slug) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không tìm thấy Album',
            });
        }
        if (slug === 'all') {
            option = {}
        }
        try {
            const album = await AlbumModule.find(option);
            if (album.length === 0) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Không tìm thấy Album',
                });
            }

            return res.status(200).json({
                errCode: 0,
                album,
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, vui lòng thử lại',
                error
            });
        }
    }

    // [POST] /album/create (formData)
    async createAlbum (req,res) {
        const image = req.fileUpload.id;
        const { idUser,name } = req.body;
        if (!idUser || !name) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn chưa nhập đầy đủ thông tin',
            });
        }
        try {
            const newAlbum = new AlbumModule({
                idUser,
                name,
                image,
            });

            await newAlbum.save();
            return res.status(200).json({
                errCode: 0,
                message: 'Thêm album thành công!',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, thêm album thất bại',
                error
            });
        }
    }

    // [POST] /album/edit (formData)
    async editAlbum (req,res) {
        const image = req.fileUpdate;
        const dataEdit = { ... req.body };
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được album'
            });
        }

        if (image) {
            dataEdit.image = image.id;
        }else {
            if (Object.keys(req.body).length === 0) {
                return res.status(204).json({
                    errCode: 0,
                    message: 'Không có sự thay đổi cho album'
                });
            }
        }

        try {
            await AlbumModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập thông tin album thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Sửa album không thành công',
                error,
            });
        }
    }

    // [POST] /album/delete
    async deleteAlbum (req,res) {
        const { albumId } = req.body;
        if (!albumId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, album không tồn tại'
            });
        }
        try {
            const albumDelete = await AlbumModule.findByIdAndDelete({
                _id: albumId,
            });
            console.log(albumDelete);
            await uploadDriver.deleteFile(albumDelete.image);
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa album thành công',
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }
}

module.exports = new AlbumController;