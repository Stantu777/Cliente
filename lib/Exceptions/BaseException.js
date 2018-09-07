import has from 'lodash/has'

export default class BaseException extends Error {
    constructor(...args) {
        super(args)

        if (has(Error, 'captureStackTrace')) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}