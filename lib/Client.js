import Person from './Dataclasses/Person'
import User from './Dataclasses/User'

export default class Client {
    constructor() {
        this._user = null
    }

    get isConnected() {
        return this._user !== null;
    }

    connect(cb) {
        new Promise(resolve => {
            setTimeout(() => {
                this._user = new User({
                    person: new Person({
                        id: 123456789,
                        id_type: 2,
                        first_name: 'Test',
                        last_name: 'McTestFace',
                        email: 'test@localhost'
                    }),
                    active: true
                })

                resolve(this._user)
            }, 3000)
        }).then(user => {
            cb(user)
        })
    }
}