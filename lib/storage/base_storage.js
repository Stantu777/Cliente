import { NotImplementedStorageMethod } from '../exceptions'

export default class BaseStorage {
    get() {
        throw new NotImplementedStorageMethod
    }

    set() {
        throw new NotImplementedStorageMethod
    }

    remove() {
        throw new NotImplementedStorageMethod
    }

    clear() {
        throw new NotImplementedStorageMethod
    }
}