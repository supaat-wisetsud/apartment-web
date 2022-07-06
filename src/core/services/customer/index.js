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
            `/api/v1/customer`,
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
            `/api/v1/customer/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${authService.getToken()}`,
                }
            }
        )
        .then(HttpResponse.success)
        .catch(HttpResponse.error);
    },
    create: async (name, citizenID, phoneNo, email, address) => {
        let data = {
            name,
            "citizen_id": citizenID,
            "phone_no": phoneNo,
            email,
            address
        }
        return await newAxios.post(
            `/api/v1/customer`,
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
    update: async (name, citizenID, phoneNo, email, address, id) => {
        let data = {}
        if (name) {
            data = {...data, name}
        }
        if (citizenID) {
            data = {...data, "citizen_id": citizenID}
        }
        if (phoneNo) {
            data = {...data, "phone_no": phoneNo}
        }
        if (email) {
            data = {...data, email}
        }
        if (address) {
            data = {...data, address}
        }
        return await newAxios.put(
            `/api/v1/customer/${id}`,
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
    uploadProfile: async (profile, id) => {

    },
    remove: async (id) => {
        return await newAxios.delete(
            `/api/v1/customer/${id}`,
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
            `/api/v1/customer/destory/${id}`,
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