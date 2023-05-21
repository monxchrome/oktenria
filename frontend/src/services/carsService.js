import {axiosService} from "./axiosService";
import {urls} from "../config/urls";

const carsService = {
    getAll: (page=1) => axiosService.get(urls.cars,{params:{page}}),
    getById: (id) => axiosService.get(`${urls.cars}/${id}`),
    create: (newCar) => axiosService.post(urls.cars, newCar),
    photo: (id, data) => axiosService.post(`${urls.cars}/${id}/photo`, data)
}

export {
    carsService
}