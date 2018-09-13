import has from 'lodash/has'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import { count } from './counter'

export default class EventDispatcher {
    _events = {}

    dispatch(eventKey, ...args) {
        const event = this.findEvent(eventKey)

        if (event === null) {
            return
        }

        forEach(event, ({ handler }) => {
            handler(...args)
        })
    }

    addEventListener(key, handler) {
        let event = this.findEvent(key)

        if (event === null) {
            event = this.newEvent(key)
        }

        const listener = this.newHandler(handler)
        
        event.push(listener)

        return listener.id
    }

    removeEventListener(eventKey, listenerId) {
        const event = this.findEvent(eventKey)

        if (event === null) {
            return
        }

        remove(event, ({ id }) => id === listenerId)
    }

    newEvent(key) {
        if (has(this._events, key)) {
            return this._events[key]
        }

        return this._events[key] = []
    }

    newHandler(handler) {
        return {
            id: count(),
            handler: handler
        }
    }

    findEvent(key) {
        return has(this._events, key) ? this._events[key] : null
    }
}