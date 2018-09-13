import axios from 'axios'
import merge from 'lodash/merge'
import toLower from 'lodash/toLower'
import toUpper from 'lodash/toUpper'
import cloneDeep from 'lodash/cloneDeep'
import { ENDPOINTS } from './endpoints'
import { UndefinedEndpoint } from '../exceptions'
import buildRequestConfig, { REQUEST_OPTIONS } from './request_options'

export default class HttpClient {
    _attrs = {}

    _axios = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 15000
    })
    
    request(endpointKey, payload = null, successCb = null, errorCb = null) {
        const endpoint = ENDPOINTS[toUpper(endpointKey)] || null

        if (endpoint === null) {
            throw new UndefinedEndpoint
        }

        const { path, method, options } = endpoint

        const attrs = this._makeDatafulAttrs(path, method, options, payload)

        const promise = this._axios.request(buildRequestConfig(options, attrs))

        promise.then(r => {
            if (successCb === null) {
                return
            }

            successCb(r)
        }).catch(e => {
            if (errorCb === null) {
                return
            }

            errorCb(e)
        })
    }

    updateAttrs(attrs) {
        this._attrs = merge(this._attrs, attrs)
    }

    _isInitialized() {
        return this._axios !== null && this._attrs !== null
    }

    _makeDatafulAttrs(path, method, optionsCode, payload = null) {
        let attrs = {
            url: path,
            method: toLower(method)
        }
        
        if (!(optionsCode & REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD)) {
            attrs.data = payload
        }

        return merge(cloneDeep(this._attrs), attrs)
    }
}