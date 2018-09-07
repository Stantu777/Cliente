import axios from 'axios'

export default class Http {
    _baseURL = 'http://localhost:8080/'

    _http = axios.create({
        baseURL: this._baseURL,
        timeout: 15000,
        headers: {
            'X-Client': 'Genesis Client Lib (https://github.com/drakantas/Genesis-client)'
        }
    })
}