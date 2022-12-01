import request from "../utils/axios"

export const createRefreshToken = async (idUser) => {
    const result = await request.post('/user/refreshToken',{
        id: idUser
    });
    return result;
}

export const signIn = async (data) => {
    try {
        const response = await request.post('/user/signIn',data);
        return {
            errCode: response.errCode,
            message: response.message,
            token: response.token,
            idUser: response.idUser,
        }
    } catch (error) {
        return {
            errCode: error.errCode,
            message: error.message,
        }
    }

}