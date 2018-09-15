import has from 'lodash/has'
import forOwn from 'lodash/forOwn'
import merge from 'lodash/merge'

export default class BaseDataclass {
    populate(data) {
        return forOwn(this, (_, k) => {
            if(!has(data, k)) {
                return
            }

            this[k] = data[k]
        })
    }

    update(data) {
        merge(this, data)
        
        return this
    }
}