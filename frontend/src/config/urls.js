const baseURL = '/api'

const auth = '/auth'

const urls = {
    auth: {
        login: `${auth}/login`,
        refresh: `${auth}/refresh`,
        me: `${auth}/me`,
        register: `${auth}/register`
    },
    cars: '/cars',
    users: '/users'
}

export {
    baseURL,
    urls
}