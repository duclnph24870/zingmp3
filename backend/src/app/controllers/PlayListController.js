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
        const { name } = req.body;
        const idUser = req.user.id;

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
        const idUser = req.user.id;
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
                idUser
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
                message: 'Sửa playlist không thành công',
                error,
            });
        }
    }

    // [POST] /playlist/delete/:idPlaylist
    async deletePlaylist (req,res) {
        const playlistId = req.params.idPlaylist;
        const idUser = req.user.id;

        if (!playlistId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được playlist cần xóa'
            });
        }
        try {
            const playlistDelete = await PlayListModule.findOneAndDelete({
                _id: playlistId,
                idUser: idUser,
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Xóa thành công',
                id: playlistDelete._id,
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }

    // [POST] /playlist/action/:idPlaylist 
    async actionSongPlaylist (req,res) {
        const idPlaylist = req.params.idPlaylist;
        const { action,idSong } = req.body;
        let option = null;
        if (!action || !idSong || !idPlaylist) {
            return res.json({
                errCode: 1,
                message: 'Chưa nhập đầy đủ thông tin'
            });
        }
        
        if (action === 'add') {
            option = {
                $push: { idSong: idSong }
            }
        }else if (action === 'remove') {
            option = {
                $pull: { idSong: idSong }
            }
        }
        try {
            let checkPlaylistQuery = PlayListModule.findOne({ _id: idPlaylist });
            let checkSongQuery = PlayListModule.findOne({ _id: idPlaylist, idSong: idSong });
            const [checkPlaylist,checkSong] = await Promise.all([checkPlaylistQuery,checkSongQuery]);
            
            if (!checkPlaylist) {
                return res.json({
                    errCode: 1,
                    message: 'PLaylist không tồn tại',
                });
            }

            if (checkSong ) {
                return res.json({
                    errCode: 1,
                    message: 'Bài hát đã tồn tại trong playlist',
                });
            }
            const newPLaylist = await PlayListModule.findOneAndUpdate({ _id: idPlaylist },option,{ new: true });

            return res.status(200).json({
                errCode: 0,
                newPLaylist
            })
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: error.message,
            });
        }
    }
}

module.exports = new PlayListController;