const UserModule = require('../modules/UserModule');
require('dotenv').config();
const jwtAction = require('../../service/jwtActions');

const UserController = {
    // [POST] /user/signUp 
    async signUp (req,res) {
        const { userName,email, password, gender, description, birthday, country } = req.body;

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
                userName,email,password,gender,description,birthday,idCountry: country
            });
            const newUser = await users.save();

            const token = await jwtAction.createJwt({
                id: newUser._id,
            });
            
            return res.status(200).json({
                errCode: 0,
                message: 'Đăng ký tài khoản thành công!',
                token
            });
        } catch (error) {
            return res.status(400).json({
                errCode: 1,
                error,
            })
        }
    },

    // [GET] /user/:slug
    async selectUser (req,res) {
        let slug = req.params.slug;
        let option = {
            slug
        };
        if (slug === 'all') {
            option = {}
        }
        try {
            const user = await UserModule.find(option).select(['-password']);

            if (user.length === 0) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'User không tồn tại',
                }); 
            }

            return res.status(200).json({
                errCode: 0,
                user,
            })
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, vui lòng thử lại',
                error
            });
        }
    },

    // [POST] /user/signIn
    async signIn (req,res) {
        const { email,password } = req.body;
        if (!email || !password || email.length === 0 || password.length === 0) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn chưa nhập đầy đủ thông tin',
            });
        }

        try {
            const user = await UserModule.findOne({ email });            
            if (!user) {
                return res.status(500).json({
                    errCode: 1,
                    message: 'Email bạn nhập không chính xác!'
                });
            }

            let checkPass = user.checkPassword(password);

            if (!checkPass) {
                return res.status(500).json({
                    errCode: 1,
                    message: "Mật khẩu của bạn không chính xác"
                });
            }

            const token = await jwtAction.createJwt({
                id: user._id,
            });

            return res.status(200).json({
                errCode: 0,
                message: 'Đăng nhập thành công',
                token,
            });

        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server, vui lòng thử lại',
                error
            });
        }
    },

    // [POST] /user/refreshToken/:id
    async createRefreshToken (req,res) {
        const id = req.params.id;   
        try {
            const newToken = await jwtAction.createJwt({id});
            if (newToken && newToken.errCode === 1) {
                return res.status(500).json({
                    ... newToken
                });
            }

            return res.status(200).json({
                errCode: 0,
                token: newToken,
            });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server,lấy refreshToken thất bại!',
                error
            });
        }
    }
}

module.exports = UserController;