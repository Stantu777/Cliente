import clientInstance from '../'
import BaseDataclass from './base_dataclass'

export default class Person extends BaseDataclass {
    id = null
    idType = null
    firstName = null
    lastName = null
    age = null
    sex = null
    address = null
    email = null
    phone = null
    school = null
    title = null
    account = null

    static exists(obj) {
        const {
            id = null,
            email = null
        } = obj

        const params = {}

        if (id !== null) {
            params.id = id
        }

        if (email !== null) {
            params.email = email
        }

        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'accounts/exists',
                params: params,
                onSuccess: response => {
                    resolve(response.data)
                },
                onError: e => {
                    reject(e)
                }
            })
        })
    }
}