import HttpClient from './http'
import KeyValueStorage from './storage'
import { Person, Account } from './dataclasses'

export default class Client {
    _me = null
    _isConnected = false
    _isReady = false
    _http = new HttpClient
    _storage = new KeyValueStorage
    _onConnected = null
    _onReady = null

    get me() {
        return this._me
    }

    get http() {
        return this._http
    }

    get ready() {
        return this._isReady
    }

    set onReady(onReady) {
        this._onReady = onReady
    }

    set onConnected(onConnected) {
        this._onConnected = onConnected
    }

    start() {
        const token = this._storage.get('token')

        if (token === null) {
            return
        }

        this._http.updateAttrs({ token: token })

        this._setConnected()

        
        if (this._isReady) {
            return
        }

        this._fetchMe()
    }

    connect(credential) {
        if (this._isConnected) {
            return
        }

        this._http.request('login', credential, this._onConnectSuccess, this._onConnectError)
    }

    disconnect() {
        this._storage.remove('token')
        this._isConnected = false
        this._isReady = false
        this._me = null
    }

    _fetchMe() {
        this._http.request('@me', null, this._onFetchMeSuccess, this._onFetchMeError)
    }

    _onConnectSuccess = r => {
        const { token } = r.data

        this._storage.set('token', token)
        this._http.updateAttrs({ token: token })

        this._setConnected()

        if (this._onConnected !== null) {
            this._onConnected(this, null)
        }

        this._fetchMe()
    }

    _onConnectError = e => {
        if (this._onConnected === null) {
            return
        }
        
        this._onConnected(this, e)
    }

    _onFetchMeSuccess = r => {
        this._me = (new Account).update({person: (new Person).populate(r.data)})

        this._setReady()

        if (this._onReady !== null) {
            this._onReady(this, null)
        }
    }

    _onFetchMeError = e => {
        if (this._onReady === null) {
            return
        }

        this._onReady(this, e)
    }

    _setConnected() {
        this._isConnected = true
    }

    _setReady() {
        this._isReady = true
    }
}