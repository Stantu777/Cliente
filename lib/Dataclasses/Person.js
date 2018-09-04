export default class Person {
    constructor(data) {
        this.id = data.id || null
        this.id_type = data.id_type || null
        this.first_name = data.first_name || null
        this.last_name = data.last_name || null
        this.age = data.age || null
        this.sex = data.sex || null
        this.address = data.address || null
        this.email = data.email || null
        this.phone = data.phone || null
        this.school = data.school || null
        this.title = data.title || null
    }
}