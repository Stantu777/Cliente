import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

const BASE_REQUEST_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'Genesis Client Lib (https://github.com/drakantas/Genesis-client)'
    }
}

export const REQUEST_OPTIONS = {
    WITH_EMPTY_PAYLOAD: 0x01,
    WITH_AUTHORIZATION: 0x10
}

export default function buildRequestConfig(optionsCode, requestAttrs) {
    const { data = null, token = null, ...otherConfig } = requestAttrs

    switch(optionsCode) {
        case REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD:
            return merge(cloneDeep(BASE_REQUEST_CONFIG), { ...otherConfig, data: null })
        case REQUEST_OPTIONS.WITH_AUTHORIZATION:
            return merge(cloneDeep(BASE_REQUEST_CONFIG), {
                ...otherConfig,
                data: data,
                headers: { 'Authorization': token }
            })
        case REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD | REQUEST_OPTIONS.WITH_AUTHORIZATION:
            console.log('sup')
            return merge(cloneDeep(BASE_REQUEST_CONFIG), {
                ...otherConfig,
                data: null,
                headers: { 'Authorization': token }
            })
    }

    return merge(cloneDeep(BASE_REQUEST_CONFIG), { ...otherConfig, data: data })
}