const jwtActions = require('../../service/jwtActions');
const UserModule = require('../modules/UserModule');

class AuthMiddleware {
    async checkSignIn (req,res,next) {
        const token = req.body.token || req.params.token || req.query.token || req.headers.token;
        if (!token) {
            return res.status(500).json({
                errCode: 1,
                message: 'Bạn cần đăng nhập để thực hiện thao tác này',
            });
        }
        try {
            const data = await jwtActions.verifyJwt(token);
            // token sai hoặc hết hạn
            if (data && data.errCode === 1) {
                return res.status(200).json({
                    ... data,
                    status: 401
                });
            }
            const user = await UserModule.findOne({ _id: data.id });
            // check user tồn tại
            if (!user) {
                return res.status(404).json({
                    message: 'User không tồn tại hoặc đã bị xóa',
                })
            }
            req.user = {
                id: user._id,
                role: user.role,
            };
            next();
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                message: 'Lỗi server',
                error,
            });            
        }
    }

    isRole_1 (req,res,next) {
        const role = req.user.role;
        if (role === 1) {
            return next();
        }
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn không đủ quyền hạn để thực hiện chức năng này'
        });
    }

    isRole_2 (req,res,next) {
        const role = req.user.role;
        if (role === 2) {
            return next();
        }
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn không đủ quyền hạn để thực hiện chức năng này'
        });
    }

    isRole_3 (req,res,next) {
        const role = req.user.role;
        if (role === 3) {
            return next();
        }
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn không đủ quyền hạn để thực hiện chức năng này'
        });
    }

    isRole_4 (req,res,next) {
        const role = req.user.role;
        if (role === 4) {
            return next();
        }
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn không đủ quyền hạn để thực hiện chức năng này'
        });
    }
}

module.exports = new AuthMiddleware;