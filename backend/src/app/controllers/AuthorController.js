const AuthorModule = require('../modules/AuthorModule');
const uploadDriver = require('../../service/uploadDriver');

class AuthorController {
    // [POST] /author/create (formData)
    async createAuthor (req,res) {
        const file = req.file;
        const { name,gender,idCountry } = req.body;
        if (!name || !gender || !idCountry) {
            return res.status(500).json({
                errCode: 1,
                message: "Bạn chưa nhập đầy đủ thông tin"
            })
        }

        try {
            const image = await uploadDriver.uploadFile(file);
            const newAuthor = new AuthorModule({
                name,
                gender,
                idCountry,
                image
            });

            await newAuthor.save();

            return res.json({
                errCode: 0,
                message: "Thêm nghệ sĩ thành công",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                errCode: 1,
                error,
            });
        }
        
    }

    // [GET] /author/:slug (json)
    async selectAuthor (req,res) {
        const slug = req.params.slug;
        let option = { slug };
        if (!slug) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không tìm thấy nghệ sĩ',
            });
        }
        if (slug === 'all') {
            option = {}
        }
        try {
            const author = await AuthorModule.find(option);
            return res.status(200).json({
                errCode: 0,
                author,
            })
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            })
        }
    }

    // [POST] /author/delete (json)
    async deleteAuthor (req,res) {
        const { authorId } = req.body;
        if (!authorId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, nghệ sĩ không tồn tại'
            });
        }
        try {
            const authorDelete = await AuthorModule.findByIdAndDelete({
                _id: authorId,
            });
            console.log(authorDelete);
            await uploadDriver.deleteFile(authorDelete.image);
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa nghệ sĩ thành công',
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }

    // [POST] /author/edit (formData)
    async editAuthor (req,res) {
        const image = req.fileUpdate;
        const dataEdit = { ...req.body };
        if (image) {
            dataEdit.image = image.id;
        }
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Nghệ sĩ không tồn tại',
            });
        }
        try {
            await AuthorModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập nghệ sĩ thành công',
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

module.exports = new AuthorController;