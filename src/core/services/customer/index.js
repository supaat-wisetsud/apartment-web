import axios from "axios";
import Environment from "../../../env";
import authService from "../auth";
import HttpResponse from "../../utils/http_response";

const newAxios = axios.create({
  baseURL: Environment.baseUrl,
});

const customerService = {
  findAll: async () => {
    return await newAxios
      .get(`/api/v1/customer`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  findOneByID: async (id) => {
    return await newAxios
      .get(`/api/v1/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  create: async (data) => {
    return await newAxios
      .post(`/api/v1/customer`, data, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  update: async (data, id) => {
    return await newAxios
      .put(`/api/v1/customer/${id}`, data, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  uploadProfile: async (profile, id) => {
    const form = new FormData()
    form.append("profile", profile)

    return await newAxios
      .put(`/api/v1/customer/profile/${id}`, 
      form,
      {
        headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  remove: async (id) => {
    return await newAxios
      .delete(`/api/v1/customer/${id}`, {
        headers: {
            Authorization: `Bearer ${authService.getToken()}`,
          },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  destory: async (id) => {
    return await newAxios
      .delete(`/api/v1/customer/destory/${id}`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
};
export default customerService;
