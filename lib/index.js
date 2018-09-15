import { Client } from './client'
export { School } from './dataclasses'

let _clientInstance = null

/**
 * @returns {Client}
 */
export default function clientInstance() {
    if (_clientInstance === null) {
        _clientInstance = new Client
    }

    return _clientInstance
}