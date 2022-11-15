const UserModule = require('../modules/UserModule');

const UserController = {
    search (req,res) {
        return resizeBy.json('hello')
    },

    // [GET] /api/users 
    async getUsers (req,res) {
        try {
            const users = await UserModule.find({});

            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json('Lỗi')
        }
    }
}

module.exports = UserController;