const uploadDriver = require('../../service/uploadDriver');
const CategoryModule = require('../modules/CategoryModule');

class CategoryController {
    // [GET] category/:slug
    async select (req,res) {
        const slug = req.params.slug;
        let optionFind = { slug };
        if (slug === 'all') { optionFind = {} }
        try {
            const result = await CategoryModule.find(optionFind);
            if (result.length === 0) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Không tìm thấy category group'
                });
            }
            return res.status(200).json({
                errCode: 0,
                category: result,
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error
            })
        }
    }

    // [POST] category/create (form data)
    async createCategory (req,res) {
        const image = req.fileUpload.id;
        const { idUser,name,idCateGroup } = req.body;

        if (!idUser || !name || !idCateGroup) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn chưa nhập đầy đủ thông tin'
            });
        }

        try {
            const newCate = new CategoryModule({
                idUser,
                image,
                name
            });
            const result = await newCate.save();

            return res.status(200).json({
                errCode: 0,
                message: 'Thêm thể loại thành công',
                result
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error
            });
        }
    }

    // [POST] category/edit (form data)
    async editCate (req,res) {
        const image = req.fileUpdate;
        const dataEdit = { ... req.body };
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được thể loại'
            });
        }

        if (image) {
            dataEdit.image = image.id;
        }else {
            if (Object.keys(req.body).length === 0) {
                return res.status(204).json({
                    errCode: 0,
                    message: 'Không có sự thay đổi cho thể loại'
                });
            }
        }

        try {
            await CategoryModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập thông tin thể loại thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Sửa thể loại không thành công',
                error,
            });
        }
    }

    // [POST] category/delete (json)
    async deleteCategory (req,res) {
        const { categoryId } = req.body;
        if (!categoryId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, mục cần xóa không tồn tại'
            });
        }
        try {
            const categoryDelete = await CategoryModule.findByIdAndDelete({
                _id: categoryId,
            });
            await uploadDriver.deleteFile(categoryDelete.image);
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

module.exports = new CategoryController;