import has from 'lodash/has'
import toLower from 'lodash/toLower'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import isNumeric from 'validator/lib/isNumeric'
import { default as isEqual }  from 'validator/lib/equals'

const MAX_ID_TYPE = 3
const MAX_AGE = 150
const MAX_SEX = 3
const MAX_INTEGER = 2 ** 31 - 1

const validator = {
    id: function(value, type = null) {
        let isValid = !isEmpty(value)

        if (!isValid) {
            return false
        }

        switch(type) {
            case 1: // DNI
                return isLength(value, { min: 7, max: 8 }) && isNumeric(value)
            case 2: // Carné de extranjería
                return isLength(value, { min: 7, max: 9 }) && isNumeric(value)
            case 3: // Pasaporte
                return isLength(value, { min: 9, max: 9 }) && isNumeric(value)
        }

        return false
    },
    idtype: function(value) {
        if ('number' === typeof value) value = value.toString()

        return !isEmail(value) && isLength(value, { min: 1, max: 1 }) && isNumeric(value) && +value <= MAX_ID_TYPE
    },
    firstname: function(value) {
        return !isEmail(value) && isLength(value, { min: 1, max: 128 })
    },
    lastname: function(value) {
        return !isEmail(value) && isLength(value, { min: 1, max: 128 })
    },
    age: function (value) {
        return !isEmail(value) && isLength(value, { min: 1, max: 3 }) && isNumeric(value) && +value <= MAX_AGE
    },
    sex: function (value) {
        if ('number' === typeof value) value = value.toString()

        return !isEmail(value) && isLength(value, { min: 1, max: 1 }) && isNumeric(value) && +value <= MAX_SEX
    },
    schoolid: function (value) {
        if ('number' === typeof value) value = value.toString()

        return !isEmail(value) && isNumeric(value)
    },
    email: function(value) {
        return !isEmpty(value) && isLength(value, { min: 12, max: 64 }) && isEmail(value)
    },
    address: function (value) {
        return !isEmpty(value) && isLength(value, { min: 12, max: 255 })
    },
    phone: function (value) {
        return !isEmpty(value) && isLength(value, { min: 9, max: 32 })
    },
    password: function(value) {
        return !isEmpty(value) && isLength(value, { min: 6, max: 24 })
    },
    repeatpassword: function(value, passwordValue) {
        return !isEmpty(value) && isLength(value, { min: 6, max: 24 }) && isEqual(value, passwordValue)
    },
    topic: function(value) {
        return !isEmpty(value) && isLength(value, { min: 16, max: 255 })
    },
    description: function(value) {
        return !isEmpty(value) && isLength(value, { min: 16, max: 1024 })
    },
    lineOfInvestigationId: function(value) {
        return !isEmpty(value) && isLength(value, { min: 1, max: 10 }) && isNumeric(value) && +value <= MAX_INTEGER
    }
}

/**
 * Validate if an input is correct
 * 
 * @param {String} key
 * @param {String} value
 * @param {String} [repeat=]
 * 
 * @returns {boolean} True if value is okay and false if not
 */
export default function validate(key, value, repeat = null) {
    const lowercaseKey = toLower(key)

    if (!has(validator, lowercaseKey)) {
        return true
    }

    return validator[lowercaseKey](value, repeat)
}

/**
 * Opposite to validate(key, value) this one checks if the input
 * has an error
 * 
 * @param {String} key
 * @param {String} value
 * 
 * @returns {boolean} False if value is okay and true if it isn't
 */
export function hasError(key, value) {
    return !validate(key, value)
}