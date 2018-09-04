/**
 * Implement library
 */
import Client from '../../lib'

export default class Connection {
    constructor() {
        this._client = new Client()

        this._client.connect(() =>  {
            console.log(this, this._client._user)
        })
    }
}