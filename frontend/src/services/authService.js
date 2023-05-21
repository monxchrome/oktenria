import {axiosService} from "./axiosService";
import {urls} from "../config/urls";

const accessTokenKey =  'access'
const refreshTokenKey = 'refresh'

const authService = {
    login: async function (data) {
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

    register: async function (data) {
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

    setTokens: ({accessToken, refreshToken}) => {
        localStorage.setItem(accessTokenKey, accessToken)
        localStorage.setItem(refreshTokenKey, refreshToken)
    },
    getAccessToken: () => localStorage.getItem(accessTokenKey),
    getRefreshToken: () => localStorage.getItem(refreshTokenKey),
    deleteTokens: () => {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    },
    isAuth: () => !! localStorage.getItem(accessTokenKey)
}

export {
    authService
}