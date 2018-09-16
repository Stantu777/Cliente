import map from 'lodash/map'
import clientInstance from '../'
import BaseDataclass from './base_dataclass'

export default class School extends BaseDataclass {
    id = null
    name = null
    address = null
    website = null
    phone = null

    static all() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'schools',
                onSuccess: r => {
                    resolve(map(r.data, school => (new School).populate(school)))
                },
                onError: e => {
                    reject(e)
                }
            })
        })
    }
}