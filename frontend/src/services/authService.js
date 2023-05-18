import {axiosService} from "./axiosService";
import {urls} from "../config/urls";

const accessToken =  'access'
const refreshToken = 'refresh'

const authService = {
    login: async (data) => {
        try {
            const response = await axiosService.post(urls.auth.login, data)

            if (response.status === 200) {
                this.setTokens(response.data)
            }

            return response
        } catch (e) {
            console.log(e)
        }
    },

    register: async (data) => {
        try {
            const response = await axiosService.post(urls.auth.register, data)

            if (response.status !== 200) {
                throw new Error('Error for registration');
            }

            return response;
        } catch (e) {
            console.log(e)
        }
    },

    refresh: async function (refresh){
        const response = await axiosService.post(urls.auth.refresh, {refresh})

        if (response.status === 200) {
            this.setTokens(response.data)
        }

        return response
    },

    setTokens: ({access, refresh}) => {
        localStorage.setItem(accessToken, access)
        localStorage.setItem(refreshToken, refresh)
    },
    getAccessToken: () => localStorage.getItem(accessToken),
    getRefreshToken: () => localStorage.getItem(refreshToken),
    deleteTokens: () => {
        localStorage.removeItem(accessToken)
        localStorage.removeItem(refreshToken)
    },
    isAuth: () => !! localStorage.getItem(accessToken)
}

export {
    authService
}