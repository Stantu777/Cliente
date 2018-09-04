import Person from './Dataclasses/Person'
import User from './Dataclasses/User'
import Http from './Http'
import Storage from './Storage'

const EMPTY = ''

export default class Client {
    constructor() {
        this._user = null
        this._http = new Http()
        this._storage = new Storage()
    }

    get isConnected() {
        return this._user !== null;
    }

    connect(data) {
        const { email = EMPTY, password = EMPTY } = data

        this._http.request('LOGIN', {
            email: email,
            password: password
        }, response => {
            const { token } = response.data

            this._storage.set('TOKEN', token)
        })
    }

    fetchMe() {

    }
}