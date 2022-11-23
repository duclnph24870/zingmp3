const UserModule = require('../modules/UserModule');
require('dotenv').config();
const jwtAction = require('../../service/jwtActions');

const UserController = {
    // [POST] /user/signUp 
    async signUp (req,res) {
        const { userName,email, password, gender, image, description, birthday, country } = req.body;

        try {
            const checkEmail = await UserModule.findOne({
                email,
            });

            if (checkEmail) {
                return res.status(400).json({
                    errCode: 1,
                    message: "Email đã tồn tại!"
                });
            }

            const users = new UserModule({
                userName,email,password,gender,image,description,birthday,idCountry: country
            });
            const newUser = await users.save();

            const token = await jwtAction.createJwt({
                _id: newUser._id,
                role: newUser.role,
            });
            
            return res.status(200).json({
                errCode: 0,
                token
            });
        } catch (error) {
            return res.status(400).json({
                errCode: 1,
                error,
            })
        }
    }
}

module.exports = UserController;