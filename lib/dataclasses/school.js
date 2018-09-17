import map from 'lodash/map'
import clientInstance from '../'
import BaseDataclass from './base_dataclass'
import LineOfInvestigation from './line_of_investigation'

export default class School extends BaseDataclass {
    id = null
    name = null
    address = null
    website = null
    phone = null
    linesOfInvestigation = null

    getLinesOfInvestigation() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'schools/lines',
                vars: { id: this.id },
                onSuccess: ({ data }) => {
                    if (this.linesOfInvestigation !== null) {
                        resolve(this.linesOfInvestigation)
                    }

                    this.linesOfInvestigation = map(data, line => (new LineOfInvestigation).populate(line).update({ school: this }))

                    resolve(this.linesOfInvestigation)
                },
                onError: error => {
                    reject(error)
                }
            })
        })
    }

    static all() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'schools',
                onSuccess: ({ data }) => {
                    resolve(map(data, school => (new School).populate(school)))
                },
                onError: error => {
                    reject(error)
                }
            })
        })
    }
}