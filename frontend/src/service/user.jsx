import request from "../utils/axios"

export const getUser = async () => {
    try {
        const result = await request.get('/user');
        return result;
    } catch (error) {
        console.log(error);
    }
}