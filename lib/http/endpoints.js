import { REQUEST_OPTIONS } from './request_options'

export const ENDPOINTS = {
    'LOGIN': {
        path: '/login',
        method: 'POST'
    },
    'REGISTER': {
        path: '/register',
        method: 'POST'
    },
    '@ME': {
        path: '/users/@me',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD | REQUEST_OPTIONS.WITH_AUTHORIZATION
    }
}