import 'lodash'
import axios from 'axios'

const ENDPOINTS_MAP = {
    'LOGIN': {
        path: 'login',
        method: 'POST'
    },
    'REGISTER': {
        path: 'register',
        method: 'POST'
    },
    '@ME': {
        path: 'users/@me',
        method: 'GET'
    }
}

export default class Http {
    constructor() {
        this._baseURL = 'http://localhost:8080/'

        this._http = axios.create({
            baseURL: this._baseURL,
            timeout: 15000,
            headers: {
                'X-Client': 'GenesisJs (https://github.com/drakantas/Genesis-client)'
            }
        })
    }

    request(endpointName, payload = null, onSuccess = null, onError = null) {
        const { path, method } = ENDPOINTS_MAP[endpointName]
        const requestFunc = this._http[_.toLower(method)]
        let promise


        if (payload !== null) promise = requestFunc(path, {data: payload})
        else promise = requestFunc(path)

        promise.then(onSuccess !== null ? onSuccess : this.defaultOnSuccess.bind(this))
               .catch(onError !== null ? onError : this.defaultOnError.bind(this))
    }

    defaultOnSuccess(response) {
        console.debug(response);
    }

    defaultOnError(error) {
        console.error(error);
    }
}