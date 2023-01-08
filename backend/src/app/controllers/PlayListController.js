const PlayListModule = require('../modules/PlayListModule');
const uploadDriver = require('../../service/uploadDriver');

class PlayListController {
    // [GET] /playlist/:id (Lấy ra 1 playlist)
    async selectPlayList (req,res) {
        const id = req.params.id;
        const idUser = req.query.idUser;

        let optionFind = { _id: id, idUser: idUser };
        if (!id) return res.status(500).json({
            errCode: 1,
            message: 'Playlist không xác định',
        }); 
        if (id === 'all') {
            optionFind = { idUser: idUser };
        }
        try {
            const playlist = await PlayListModule.find(optionFind);
            if (playlist.length === 0) {
                return res.status(404).json({
                    errCode: 1,
                    message: "Playlist rỗng",
                })
            }

            return res.status(200).json(playlist);            
        } catch (error) {
            return res.json({
                errCode: 1,
                error,
            })
        }
    }

    // [POST] /playlist/create
    async createPlaylist (req,res) {
        const { idUser,name } = req.body;

        if (!idUser || !name) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn chưa nhập đầy đủ thông tin'
            });
        }

        try {
            const newPlaylist = new PlayListModule({
                idUser,
                name
            });
            const result = await newPlaylist.save();

            return res.status(200).json({
                errCode: 0,
                message: 'Thêm playlist thành công',
                result
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error
            });
        }
    }

    // [POST] /playlist/edit/:idPlaylist
    async editPlaylist (req,res) {
        const idPlaylist = req.params.idPlaylist;
        const { name } = req.body;
        if (!idPlaylist) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được playlist'
            });
        }

        if (!name) {
            return res.status(204).json({
                errCode: 0,
                message: 'Không có sự thay đổi cho playlist'
            });
        }

        try {
            await PlayListModule.updateOne({
                _id: idPlaylist,
            }, {
                name
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập thông tin playlist thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Sửa playlist không thành công',
                error,
            });
        }
    }

    // [POST] /playlist/delete/:idPlaylist
    async deletePlaylist (req,res) {
        const playlistId = req.params.idPlaylist;
        if (!playlistId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, mục cần xóa không tồn tại'
            });
        }
        try {
            const playlistDelete = await PlayListModule.findByIdAndDelete({
                _id: playlistId,
            });
            await uploadDriver.deleteFile(playlistDelete.image);
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa thành công',
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

module.exports = new PlayListController;