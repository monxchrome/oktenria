import {axiosService} from "./axiosService";
import {urls} from "../config/urls";

const carsService = {
    getAll: () => axiosService.get(urls.cars),
    getById: (id) => axiosService.get(`${urls.cars}/${id}`)
}

export {
    carsService
}