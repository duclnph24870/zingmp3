const SongModule = require('../modules/SongModule');
const PlayListModule = require('../modules/PlayListModule');

const uploadDriver = require('../../service/uploadDriver');
const UserModule = require('../modules/UserModule');

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
            const song = await SongModule.find(option)
                .populate({
                    path: 'idUser',
                    select: "_id userName role image"
                })
                .populate({
                    path: 'idAuthor',
                    select: "_id name image"
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
            console.log(error);
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
            const { idUser,idCountry,idCateGroup,idAlbum,idAuthor,name } = req.body;
            if (!idUser || !idCountry || !idCateGroup || !idAlbum || !name || !idAuthor) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Bạn chưa nhập đầy đủ thông tin'
                });
            }

            const audio = await uploadDriver.uploadFile(file);
            const newSong = new SongModule({
                idUser,
                idAuthor,
                idCountry,
                idCateGroup: [idCateGroup],
                idAlbum: [idAlbum],
                name,
                audio,
            });
            await newSong.save();
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

    // [GET] /song/songPlayList/:idPlaylist (json)
    async getSongPlayList (req,res) {
        try { 
            const idPlaylist = req.query.idPlayList;
            let result = null;
            if (!idPlaylist) {
                // phát không trong playList
                // Lấy ra 30 bài hát có nhiều lượt nghe nhất
                result = await SongModule.find({}).sort({
                    view: 'desc'
                }).limit(30);
            }else {
                // phát trong playList
                result = await PlayListModule.findOne({
                    _id: idPlaylist,
                }).populate({
                    path: 'idSong',
                    select: '_id name image view like idAuthor',
                });
            }

            return res.json(result);
        }catch (error) {
            return res.status(500).json({
                message: "Lỗi server",
                error
            });
            
        }
    }

    // [POST] /checkSignIn => /song/like/:songId (json)
    async likeSong (req, res) {
        const idUser = req.user.id;
        const idSong = req.params.songId;
        const type = req.query.type || 'like';

        let data = null;
        if (type === 'unlike') {
            data = {
                $pull: {liked: idSong}
            }
        }else {
            data = {
                $push: {liked: idSong}
            }
        }
        
        if (!idSong) {
            return res.json({
                errCode: 1,
                message: "Không xác định được bài hát"
            });
        }

        try {
            const result = await UserModule.updateOne({
                _id: idUser,
            },data,{
                new: true
            });

            return res.status(200).json({
                errCode: 0,
                message: "Đã thích bài hát",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                message: "Lỗi server",
            });
        }
    }

}

module.exports = new SongController;