import HttpClient from './http'
import EventDispatcher from './events'
import KeyValueStorage from './storage'
import { Person, Account, School } from './dataclasses'

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

        this._http.request({
            key: 'login',
            payload: credential,
            onSuccess: this._onConnectSuccess,
            onError: this._onConnectError
        })
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
        this._http.request({
            key: '@me',
            onSuccess: this._onFetchMeSuccess,
            onError: this._onFetchMeError
        })
    }

    _onConnectSuccess = ({ data }) => {
        const { token } = data

        this._storage.set('token', token)
        this._http.updateAttrs({ token: token })

        this._fetchMe()
    }

    _onConnectError = error => {
        this._events.dispatch('onReady', null, error)
    }

    _onFetchMeSuccess = ({ data }) => {
        let person = (new Person).populate(data)

        person = person.update({ school: (new School).populate(person.school) })

        this._me = (new Account).update({ person: person })

        this._setReady()

        this._events.dispatch('onReady', this._me, null)
    }

    _onFetchMeError = error => {
        this._events.dispatch('onReady', null, error)
    }

    _setReady() {
        this._isReady = true
    }
}