const optionsAPI = {
    test: {
        host: 'http://localhost:5000/'
    },
    production: {
        host: ''
    }
}

const MODE = optionsAPI.test

export const PEXELS_BASE_URL = 'https://api.pexels.com/v1'
export const PEXELS_API_KEY = 'HkWd5qoAIIvoRP9q0p14rtywpz73EZKHrAFgz0wze73KxTSRzjkhUC8V'

export const API_BASE_URL_ENDPOINTS = MODE.host
export const API_BASE_URL_IMG = MODE.host

export const endpoints = {
    auth: {
        login: 'api/users/login',
        register: 'api/users/register'
    },
    users: {
        updateProfile: 'api/users/profile',
        changePassword: 'api/users/change-password'
    },
    photos: {
        curated: `${PEXELS_BASE_URL}/curated`,
        search: `${PEXELS_BASE_URL}/search`
    }
}