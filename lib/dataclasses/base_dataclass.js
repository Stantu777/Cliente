import has from 'lodash/has'
import forOwn from 'lodash/forOwn'
import merge from 'lodash/merge'

export default class BaseDataclass {
    populate(data) {
        return forOwn(data, (v, k) => {
            if(!has(this, k)) {
                return
            }

            this[k] = v
        })
    }

    update(data) {
        merge(this, data)
        
        return this
    }
}