const CommentModule = require('../modules/CommentModule');

class CommentController {
    // [POST] /comment/create (json)
    async createComment (req,res) {
        const { idSong,idUser,content } = req.body;
        if (!idSong || !idUser || !content) {
            return res.status(500).json({
                errCode: 1,
                message: "Bạn chưa nhập đầy đủ thông tin"
            })
        }

        try {
            const newComment = new CommentModule({
                idSong,
                idUser,
                content
            });

            await newComment.save();

            return res.json({
                errCode: 0,
                message: "Thêm bình luận thành công",
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            });
        }
        
    }

    // [GET] /comment/:idSong (json)
    async selectComment (req,res) {
        try {
            const idSong = req.params.idSong;
            let optionFind = { idSong };
            if (idSong === 'all') {
                optionFind = {};
            }
            console.log(optionFind);
            const comment = await CommentModule.find(optionFind);
            console.log(comment);
            if (comment.length === 0) {
                return res.status(404).json({
                    errCode: 0,
                    message: 'Bài hát chưa có bình luận'
                });
            }
            return res.status(200).json({
                errCode: 0,
                comment,
            })
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            })
        }
    }

    // [POST] /comment/delete (json)
    async deleteComment (req,res) {
        const { commentId } = req.body;
        if (!commentId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, bình luận không tồn tại'
            });
        }
        try {
            const commentDelete = await CommentModule.findByIdAndDelete({
                _id: commentId,
            });
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa bình luận thành công',
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }

    // [POST] /comment/edit (json)
    async editComment (req,res) {
        const { idEdit,content } = req.body;

        if (!idEdit || !content) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bình luận không tồn tại',
            });
        }
        try {
            await CommentModule.updateOne({
                _id: idEdit,
            }, {
                content
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập bình luận thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, vui lòng thử lại',
                error,
            })
        }
    }
}

module.exports = new CommentController;