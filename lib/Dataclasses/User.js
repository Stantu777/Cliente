import Person from './Person'

export default class User {
    constructor(data) {
        this._person = data.person
        this._role = data.role || null
        this._active = data.active || null
    }

    get id() {
        return this._person.id
    }

    get person() {
        return this._person
    }
}