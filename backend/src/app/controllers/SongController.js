const SongModule = require('../modules/SongModule');

class SongController {
    // [GET] /song/:slug ( Lấy bài hát theo id chưa đăng nhập )
    async selectSong (req,res) {
        const slug = req.params.slug;
        let option = { slug };
        if (!slug) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không tìm thấy bài hát',
            });
        }
        if (slug === 'all') {
            option = {}
        }
        try {
            const song = await SongModule.find(option);
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