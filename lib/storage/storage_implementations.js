import has from 'lodash/has'
import BaseStorage from './base_storage'

export class VolatileStorage extends BaseStorage {
    map = {}

    get(key) {
        return has(map, key) ? map[key] : null
    }

    set(key, value) {
        map[key] = value
    }

    remove(key) {
        delete map[key]
    }

    clear() {
        for (const key in map) {
            if (!map.hasOwnProperty(key)) {
                continue
            }

            delete map[key]
        }
    }
}

export class PersistentStorage extends BaseStorage {
    ls = window.localStorage

    get(key) {
        return this.ls.getItem(key)
    }

    set(key, value) {
        this.ls.setItem(key, value)
    }

    remove(key) {
        return this.ls.removeItem(key)
    }

    clear() {
        return this.ls.clear()
    }

    static isAvailable() {
        const ls = window.localStorage

        try {
            ls.setItem('0', '0')
            ls.removeItem('0')
        } catch(e) {
            return false
        }

        return true
    }
}

export default class KeyValueStorage extends BaseStorage {
    storage = PersistentStorage.isAvailable() ? new PersistentStorage : new VolatileStorage

    get(key) {
        return this.storage.get(key)
    }

    set(key, value) {
        this.storage.set(key, value)
    }

    remove(key) {
        this.storage.remove(key)
    }

    clear() {
        this.storage.clear()
    }
}