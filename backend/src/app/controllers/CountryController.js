const CountryModule = require('../modules/CountryModule');

class CountryController {
    // [POST] /country/create
    async createCountry (req,res) {
        const { name,image } = req.body;
        if (!name || !image) {
            return res.status(500).json({
                errCode: 1,
                message: "Bạn chưa nhập đầy đủ thông tin"
            })
        }

        try {
            await CountryModule.create([
                {
                    name,
                    image,
                }
            ]);

            return res.json({
                errCode: 0,
                message: "Thêm user thành công",
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            });
        }
        
    }
}

module.exports = new CountryController;