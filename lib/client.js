import HttpClient from './http'
import EventDispatcher from './events'
import KeyValueStorage from './storage'
import { Person, Account } from './dataclasses'

export class Client {
    _me = null
    _isReady = false
    _http = new HttpClient
    _storage = new KeyValueStorage
    _events = new EventDispatcher

    get me() {
        return this._me
    }

    get http() {
        return this._http
    }

    get ready() {
        return this._isReady
    }

    start() {
        const token = this._storage.get('token')

        if (token === null) {
            return
        }

        this._http.updateAttrs({ token: token })

        if (this._isReady) {
            return
        }

        this._fetchMe()
    }

    connect(credential) {
        if (this._isReady) {
            return
        }

        this._http.request('login', credential, this._onConnectSuccess, this._onConnectError)
    }

    disconnect() {
        this._storage.remove('token')
        this._isReady = false
        this._me = null

        this._events.dispatch('onDisconnect')
    }

    addOnReady(handler) {
        return this._events.addEventListener('onReady', handler)
    }

    removeOnReady(listenerId) {
        this._events.removeEventListener('onReady', listenerId)
    }

    addOnDisconnect(handler) {
        return this._events.addEventListener('onDisconnect', handler)
    }

    removeOnDisconnect(listenerId) {
        this._events.removeEventListener('onDisconnect', listenerId)
    }

    _fetchMe() {
        this._http.request('@me', null, this._onFetchMeSuccess, this._onFetchMeError)
    }

    _onConnectSuccess = r => {
        const { token } = r.data

        this._storage.set('token', token)
        this._http.updateAttrs({ token: token })

        this._fetchMe()
    }

    _onConnectError = e => {
        this._events.dispatch('onReady', null, e)
    }

    _onFetchMeSuccess = r => {
        this._me = (new Account).update({person: (new Person).populate(r.data)})

        this._setReady()

        this._events.dispatch('onReady', this._me, null)
    }

    _onFetchMeError = e => {
        this._events.dispatch('onReady', null, e)
    }

    _setReady() {
        this._isReady = true
    }
}