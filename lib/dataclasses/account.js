import clientInstance from '../'
import BaseDataclass from './base_dataclass'

export default class Account extends BaseDataclass {
    person = null

    /**
     * @param {Object} payload
     * @returns {Promise}
     */
    static new(payload) {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'register',
                payload: payload,
                onSuccess: response => {
                    resolve(response)
                },
                onError: error => {
                    reject(error)
                }
            })
        });
    }
}