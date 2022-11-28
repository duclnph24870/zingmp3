const uploadDriver = require('../../service/uploadDriver');
const CategoryGroupModule = require('../modules/CategoryGroupModule');

class CategoryGroupController {
    // [GET] categoryGroup/:slug
    async select (req,res) {
        const slug = req.params.slug;
        let optionFind = { slug };
        if (slug === 'all') { optionFind = {} }
        try {
            const result = await CategoryGroupModule.find(optionFind);
            if (result.length === 0) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Không tìm thấy category group'
                });
            }
            return res.status(200).json({
                errCode: 0,
                categoryGroup: result,
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error
            })
        }
    }

    // [POST] categoryGroup/create (form data)
    async createCategoryGroup (req,res) {
        const image = req.fileUpload.id;
        const { idUser,name } = req.body;

        if (!idUser || !name) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn chưa nhập đầy đủ thông tin'
            });
        }

        try {
            const newCateGroup = new CategoryGroupModule({
                idUser,
                image,
                name
            });
            const result = await newCateGroup.save();

            return res.status(200).json({
                errCode: 0,
                message: 'Thêm nhóm thể loại thành công',
                result
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error
            });
        }
    }

    // [POST] categoryGroup/edit (form data)
    async editCateGroup (req,res) {
        const image = req.fileUpdate;
        const dataEdit = { ... req.body };
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Không xác định được nhóm thể loại'
            });
        }

        if (image) {
            dataEdit.image = image.id;
        }else {
            if (Object.keys(req.body).length === 0) {
                return res.status(204).json({
                    errCode: 0,
                    message: 'Không có sự thay đổi cho nhóm thể loại'
                });
            }
        }

        try {
            await CategoryGroupModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập thông tin nhóm thể loại thành công',
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Sửa nhóm thể loại không thành công',
                error,
            });
        }
    }

    // [POST] categoryGroup/delete (json)
    async deleteCateGroup (req,res) {
        const { cateGroupId } = req.body;
        if (!cateGroupId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, mục cần xóa không tồn tại'
            });
        }
        try {
            const cateGroupDelete = await CategoryGroupModule.findByIdAndDelete({
                _id: cateGroupId,
            });
            console.log(cateGroupDelete);
            await uploadDriver.deleteFile(cateGroupDelete.image);
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

module.exports = new CategoryGroupController;