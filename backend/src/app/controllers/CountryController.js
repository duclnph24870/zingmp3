const CountryModule = require('../modules/CountryModule');

class CountryController {
    // [POST] /country/create (formData)
    async createCountry (req,res) {
        const image = req.image.imageLink;
        const { name } = req.body;
        if (!name || !image) {
            return res.status(500).json({
                errCode: 1,
                message: "Bạn chưa nhập đầy đủ thông tin"
            })
        }

        try {
            const newCountry = new CountryModule({
                name,
                image
            });

            await newCountry.save();

            return res.json({
                errCode: 0,
                message: "Thêm quốc gia thành công",
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            });
        }
        
    }

    // [GET] /country (json)
    async selectCountry (req,res) {
        try {
            const country = await CountryModule.find({});
            return res.status(200).json({
                errCode: 0,
                country,
            })
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            })
        }
    }

    // [POST] /country/delete (json)
    async deleteCountry (req,res) {
        const { countryId } = req.body;
        console.log(req.body);
        if (!countryId) {
            return res.status(500).json({
                errCode: 1,
                message: 'Xóa không thành công, quốc gia không tồn tại'
            });
        }
        try {
            await CountryModule.deleteOne({
                _id: countryId,
            });
            return res.status(200).json({
                errCode: 0,
                message: 'Xóa quốc gia thành công',
            });
        } catch (error) {   
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, Thao tác xóa không thành công',
                error,
            });
        }
    }

    // [POST] /country/edit (formData)
    async editCountry (req,res) {
        console.log(req.body);
        const { imageLink } = req.image;
        const dataEdit = { ...req.body };
        if (imageLink) {
            dataEdit.image = imageLink;
        }
        if (!dataEdit.idEdit) {
            return res.status(500).json({
                errCode: 1,
                message: 'Quốc gia không tồn tại',
            });
        }
        try {
            await CountryModule.updateOne({
                _id: dataEdit.idEdit,
            }, {
                ... dataEdit
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Cập nhập quốc gia thành công',
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

module.exports = new CountryController;