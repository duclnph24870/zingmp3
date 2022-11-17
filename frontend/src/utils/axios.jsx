import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:3131/',
});

export const get = async (path, options = {}) => { // async: trả về 1 promis
    const response = await request.get(path, options); // await: chờ hành động thực hiện xong

    return response.data;
}

export default request;