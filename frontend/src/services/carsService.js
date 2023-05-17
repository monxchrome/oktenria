import {axiosService} from "./axiosService";
import {urls} from "../config/urls";

const carsService = {
    getAll: (page=1) => axiosService.get(urls.cars,{params:{page}}),
    getById: (id) => axiosService.get(`${urls.cars}/${id}`)
}

export {
    carsService
}