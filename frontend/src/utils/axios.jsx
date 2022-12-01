import axios from "axios";
import { createRefreshToken } from "../service/auth";

const request = axios.create({
    baseURL: 'http://localhost:3131',
});

// xử lý dữ liệu trước khi gửi request lên server
request.interceptors.request.use(
    (config) => {
        // bỏ qua các đường dẫn không config lại
        const skipRouter = ['/user/signUp','/user/signIn','/user/refreshToken'];
        if (skipRouter.includes(config.url)) return config;

        config.headers.token = `${localStorage.getItem('token')}`;
        return config;
    },
    error => Promise.reject(error)
);

// Xử lý response trước khi nhận về
request.interceptors.response.use(
    async (response) => {
        // bỏ qua các đường dẫn không config lại
        const skipRouter = ['/user/signUp','/user/signIn','/user/refreshToken'];
        if (skipRouter.includes(response.config.url)) return response.data;

        if (response.data.status === 401) {
			console.log("Access token has expired!");

			const idUser = localStorage.getItem("idUser");
			const newAccessToken = await createRefreshToken(idUser);
			localStorage.setItem("token", newAccessToken.token); // * sau khi lấy access token mới -> save lại vào local
			return response.data;
		}
        return response.data;
    },
    error => Promise.reject(error.response.data)
);

export default request;