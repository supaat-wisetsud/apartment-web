import axios from "axios";
import Environment from "../../../env";
import HttpResponse from '../../../core/utils/http_response';

const newAxios = axios.create({
  baseURL: Environment.baseUrl,
});

const authService = {
    getToken: () => {
        return localStorage.getItem("access_token");
    },
    setToken: (accessToken) => {
        localStorage.setItem("access_token", accessToken);
    },
    login: async (username, password) => {
        let data = {
            username,
            password,
        }
        return await newAxios.post(
            "/api/v1/auth/login",
            data,
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    register: async (username, password, name, phoneNo, email) => {
        let data = {
            username,
            password,
            name,
            "phone_no": phoneNo,
            email,
        }
        return await newAxios.post(
            "/api/v1/auth/register",
            data,
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    logout: async () => {
        return await newAxios.post(
            "/api/v1/auth/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    }
};

export default authService