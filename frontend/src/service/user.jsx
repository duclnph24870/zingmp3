import request from "../utils/axios"

export const getUser = async () => {
    try {
        return await request.get('/user');
    } catch (error) {
        console.log(error);
    }
}