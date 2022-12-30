const SongModule = require('../modules/SongModule');
const PlayListModule = require('../modules/PlayListModule');
const timeService = require('../../service/time');
const TotalViewModule = require('../modules/TotalViewModule');

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

    // [POST] /song/counter/:songId (json)
    async counterSong (req,res) {
        const songId = req.params.songId;
        const dayNumber  = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        
        if (!songId) {
            return res.json({
                errCode: 1,
                message: "Không xác định được bài hát"
            })
        }

        try {
            const song = await SongModule.findOne({
                _id: songId,
                "view.year": year,
            });

            // nếu bộ đếm bài hát chưa tồn tại thì tạo mới
            if (!song) {
                // tạo ra bộ đếm view cho bài hát của năm mới
                const couterNew = timeService.createCouter(true);
                const newSong = await SongModule.updateOne({ _id: songId },{
                    $push: { view: { 
                        year: year,
                        viewDetail: couterNew
                    } }
                },{ new: true });

                return res.json({
                    message: 'Tạo mới'
                })
            }

            // có rồi thì tìm và cộng view
            const viewUpdate = song.view.find(item => item.year == year).viewDetail[month-1][dayNumber - 1] + 1;
            const newSong = await SongModule.updateOne({ _id: songId },{
                $set: { [`view.$[e].viewDetail.${month-1}.${dayNumber - 1}`]:  viewUpdate},
                totalView: song.totalView + 1,
            },{ arrayFilters: [ { "e.year": year } ] });
            return res.json({
                message: 'đã tăng view'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                message: error.message,
            })
        }
    }

    // [POST] /song/chart
    async selectDataChart(req, res) {
        // lấy ra tháng hiện tại
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const numberDay = timeService.getDayOfMonth(month,year);
        const dayArr = [];
        for (let i = 1; i <= numberDay; i++) {
            dayArr.push(i);
        }

        try {
            // lấy ra view tổng của tháng
            const totalView = await TotalViewModule.findOne({
                year: year,
            });
            const totalMothView = totalView.totalView[month-1];

            // tìm ra 3 bài hát có view cao nhất
            const top3Song = await SongModule.find({}).sort({
                viewMonth: 'desc'
            }).limit(3);

            // điều chỉnh dữ liệu trả lại tránh việc dư thừa dữ liệu
            const filterSong = top3Song.map(item => {
                let persentDay = item.view.find(item => item.year === year).viewDetail[month-1].map((item,index) => {
                    let persent = item / totalMothView[index];
                    return persent >= 1 ? Math.round(persent) : +persent.toFixed(2);
                });
                let monthPersent = item.viewMonth / totalMothView.reduce((init,curr)=> init+curr,0);
                return {
                    _id: item._id,
                    image: item.image,
                    name: item.name,
                    author: item.idAuthor[0].name,
                    monthPersent:  monthPersent >= 1 ? Math.round(monthPersent) : +monthPersent.toFixed(2),
                    persentDay: persentDay,
                }
            });

            return res.json({
                labels: dayArr,
                datasets: filterSong,
            });            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                message: "Lỗi server",
            })
        }
    }
}

module.exports = new SongController;