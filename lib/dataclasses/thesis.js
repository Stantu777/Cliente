import map from 'lodash/map'
import clientInstance from '../'
import BaseDataclass from './base_dataclass'
import LineOfInvestigation from './line_of_investigation'
import Person from './person'

export default class Thesis extends BaseDataclass {
    id = null
    topic = null
    description = null
    lineOfInvestigation = null
    approved = null
    archived = null
    author = null
    partner = null

    static all() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'theses',
                onSuccess: ({ data }) => {
                    resolve(map(data, obj => {
                        return (new Thesis).populate(obj)
                                           .update({
                                               lineOfInvestigation: (new LineOfInvestigation).populate(obj.lineOfInvestigation),
                                               author: (new Person).populate(obj.author),
                                               partner: null
                                            })
                    }))
                },
                onError: error => {
                    reject(error)
                }
            })
        })
    }

    static mine() {
        return new Promise((resolve, reject) => {
            clientInstance().http.request({
                key: 'theses/@mine',
                onSuccess: ({ data }) => {
                    resolve(
                        (new Thesis).populate(data)
                                    .update({
                                        lineOfInvestigation: (new LineOfInvestigation).populate(data.lineOfInvestigation)
                                    })
                    )
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