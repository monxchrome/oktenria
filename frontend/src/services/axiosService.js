import axios from "axios";
import {baseURL} from "../config/urls";
import {createBrowserHistory} from "history";
import {authService} from "./authService";

const axiosService = axios.create({baseURL});

const history = createBrowserHistory();

axiosService.interceptors.request.use((config) => {
    if (authService.isAuth()) {
        const access = authService.getAccessToken()
        config.headers.Authorization = `${access}`
    }
    return config
})

let isRefresh = false
axiosService.interceptors.response.use((config) => {
        return config
    },
    async (e) => {
        const refresh = authService.getRefreshToken()

        if (e.response?.status === 401 && refresh && !isRefresh){
            isRefresh = true

            try {
                await authService.refresh(refresh)
            } catch (e) {
                authService.deleteTokens()
                history.replace('login?session=true')
            }
            isRefresh = false;
            return axiosService(e.config)
        }
        return Promise.reject(e)
    })

export {
    axiosService
}