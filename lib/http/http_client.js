import axios from 'axios'
import clone from 'lodash/clone'
import merge from 'lodash/merge'
import toLower from 'lodash/toLower'
import toUpper from 'lodash/toUpper'
import { ENDPOINTS } from './endpoints'
import { UndefinedEndpoint } from '../exceptions'
import buildRequestConfig, { REQUEST_OPTIONS } from './request_options'

/**
 * @param {String} path
 * @param {Object} args
 * @returns {String}
 */
function format(path, ...args) {
    if (arguments.length) {
        const t = typeof args[0];
        args = ("string" === t && "number" === t) ? Array.prototype.slice.call(args) : args

        for (const key in args) {
            path = path.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key])
        }
    }

    return path;
}

export default class HttpClient {
    _attrs = {}

    _axios = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 15000
    })

    request(conf) {
        const {
            key,
            vars = null,
            params = null,
            payload = null,
            onSuccess = null,
            onError = null
        } = conf

        const endpoint = ENDPOINTS[toUpper(key)]

        if (endpoint === undefined) {
            throw new UndefinedEndpoint
        }

        const {
            path,
            method,
            options
        } = endpoint

        let requestConf = {
            url: format(path, vars),
            method: toLower(method)
        }

        if (!(options & REQUEST_OPTIONS.WITH_EMPTY_PAYLOAD)) {
            requestConf.data = payload
        }

        if (params !== null) {
            requestConf.params = params
        }

        requestConf = buildRequestConfig(options, merge(clone(this._attrs), requestConf))

        this._axios.request(requestConf).then(r => {
            if (onSuccess !== null) {
                onSuccess(r)
            }
        }).catch(e => {
            if (onError !== null) {
                onError(e)
            }
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

        return merge(clone(this._attrs), attrs)
    }
}