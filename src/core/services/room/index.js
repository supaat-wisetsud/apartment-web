import axios from "axios"
import Environment from 'env';
import authService from '@core/services/auth'
import HttpResponse from '@core/utils/http_response';

const newAxios = axios.create({
    baseURL: Environment.baseUrl
});

export default {
    findAll: async () => {
        return await newAxios.get(
            `/api/v1/room`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    findOneByID: async (id) => {
        return await newAxios.get(
            `/api/v1/room/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    create: async (name, customerID) => {
        let data = {
            name,
            "customer_id": customerID
        }
        return await newAxios.post(
            `/api/v1/room`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    update: async (name, customerID, active, id) => {
        let data = {}
        if (name) {
            data = {...data, name}
        }
        if (customerID) {
            data = {...data, "customer_id": customerID}
        }
        if (active) {
            data = {...data, active}
        }
        return await newAxios.put(
            `/api/v1/room/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    uploadPicture: async (picture, id) => {

    },
    remove: async (id) => {
        return await newAxios.delete(
            `/api/v1/room/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    destory: async (id) => {
        return await newAxios.delete(
            `/api/v1/room/destory/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    }
}