const jwt = require('jsonwebtoken');

const createJwt = async (data) => {
    try {
        let token = await jwt.sign({ ... data }, process.env.JWT_PASSWORD, {
            expiresIn: '5m'
        })
        return token
    } catch (error) {
        return {
            errCode: 1,
            message: 'Tạo token thất bại',
        }
    }
}

const verifyJwt = async token => {
    try {
        let data = await jwt.verify(token,process.env.JWT_PASSWORD);
        return data;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return {
                errCode: 1,
                message: "Token đã hết hạn",
                name: error.name,
            }
        }
        return {
            errCode: 1,
            error,
        }
    }
}

module.exports = {
    createJwt,
    verifyJwt,
}