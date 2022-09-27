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
      .get(`/api/v1/logs`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
  create: async (customerID, roomID) => {
    return await newAxios
      .post(`/api/v1/logs`, {
        customer_id: customerID,
        room_id: roomID,
      }, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      })
      .then(HttpResponse.success)
      .catch(HttpResponse.error);
  },
};
export default customerService;
