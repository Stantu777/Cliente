import clientInstance from '../'
import BaseDataclass from './base_dataclass'
import LineOfInvestigation from './line_of_investigation'

export default class Thesis extends BaseDataclass {
    id = null
    topic = null
    description = null
    lineOfInvestigation = null
    approved = null
    archived = null

    static mine() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'theses/@mine',
                onSuccess: ({ data }) => {
                    let thesis = (new Thesis).populate(data)
                    resolve(thesis.update({ lineOfInvestigation: (new LineOfInvestigation).populate(thesis.lineOfInvestigation) }))
                },
                onError: error => {
                    reject(error)
                }
            })
        })
    }

    static new(payload) {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'theses/new',
                payload: payload,
                onSuccess: ({ data }) => {
                    resolve(data)
                },
                onError: error => {
                    reject(error)
                }
            })
        })
    }
}