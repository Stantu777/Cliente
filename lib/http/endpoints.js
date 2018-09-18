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
    'SCHOOLS': {
        path: '/schools',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD
    },
    'SCHOOLS/LINES': {
        path: '/schools/{id}/lines',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD | REQUEST_OPTIONS.WITH_AUTHORIZATION
    },
    '@ME': {
        path: '/users/@me',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD | REQUEST_OPTIONS.WITH_AUTHORIZATION
    },
    'ACCOUNTS/EXISTS': {
        path: '/accounts/exists',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD
    },
    'THESES': {
        path: '/theses',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_AUTHORIZATION
    },
    'THESES/NEW': {
        path: '/theses/new',
        method: 'POST',
        options: REQUEST_OPTIONS.WITH_AUTHORIZATION
    },
    'THESES/@MINE': {
        path: '/theses/@mine',
        method: 'GET',
        options: REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD | REQUEST_OPTIONS.WITH_AUTHORIZATION
    }
}