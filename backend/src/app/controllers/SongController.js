const SongModule = require('../modules/SongModule');
const uploadDriver = require('../../service/uploadDriver');

class SongController {
    // [GET] /song/:id ( Lấy bài hát theo id chưa đăng nhập )
    async selectSong (req,res) {
        const id = req.params.id;
        let option = { _id: id };
        if (!id) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không tìm thấy bài hát',
            });
        }
        if (id === 'all') {
            option = {}
        }
        try {
            const song = await SongModule.find(option).populate({
                path: 'idUser',
                select: "_id userName role image"
            })
            if (song.length === 0) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Không tìm thấy bài hát',
                });
            }

            return res.status(200).json({
                errCode: 0,
                song,
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, vui lòng thử lại',
                error
            });
        }
    }

    // [POST] /song/create ( form data )
    async createSong (req,res) {
        try {
            const file = req.file;
            const { idUser,idCountry,idCateGroup,idAlbum,name } = req.body;
            if (!idUser || !idCountry || !idCateGroup || !idAlbum || !name) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Bạn chưa nhập đầy đủ thông tin'
                });
            }

            const audio = await uploadDriver.uploadFile(file);
            const newSong = new SongModule({
                idUser: [idUser],
                idCountry,
                idCateGroup: [idCateGroup],
                idAlbum: [idAlbum],
                name,
                audio,
            });
            await newSong.save();
            console.log('save complete');
            return res.status(200).json({
                errCode: 0,
                message: 'Thêm bài hát thành công',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                error
            });
        }
    }

    // [POST] /song/edit (form data)
    async editSong (req,res) {
        const image = req.fileUpdate;
        const dataEdit = { ... req.body };
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được bài hát'
            });
        }

        if (image) {
            dataEdit.image = image.id;
        }else {
            if (Object.keys(req.body).length === 0) {
                return res.status(204).json({
                    errCode: 0,
                    message: 'Không có sự thay đổi cho bài hát'
                });
            }
        }

        try {
            await SongModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập thông tin bài hát thành công',
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Sửa bài hát không thành công',
                error,
            });
        }
    }

    // [POST] /song/delete (json)
    async deleteSong (req,res) {
        const { songId } = req.body;
        if (!songId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, bài hát không tồn tại'
            });
        }
        try {
            const songDelete = await SongModule.findByIdAndDelete({
                _id: songId,
            });
            await uploadDriver.deleteFile(songDelete.image);
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa bài hát thành công',
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }

    // [GET] /song/nextSong/:skipId ( next btn ocClick, next random )
    async nextSong (req,res) {
        const skipId = req.params.skipId;
        try {
            // đếm số bản ghi hiện có trong db
            const count = await SongModule.count();
            let startIndexSelect = Math.floor(Math.random() * (count - 1)); 

            const song = await SongModule.find({
                _id: { $ne: skipId }
            })
            .skip(startIndexSelect)
            .limit(1)

            return res.status(200).json({
                errCode: 0,
                song,
            })
            
        } catch (error) {
            return res.status(400).json({
                errCode: 1,
                error,
            })
        }
    }

}

module.exports = new SongController;