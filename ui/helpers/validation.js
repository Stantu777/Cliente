import has from 'lodash/has'
import toLower from 'lodash/toLower'
import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import isLength from 'validator/lib/isLength'
import { default as isEqual }  from 'validator/lib/equals'

const validator = {
    email: function(value) {
        return !isEmpty(value) && isLength(value, {min: 12, max: 64}) && isEmail(value)
    },
    password: function(value) {
        return !isEmpty(value) && isLength(value, {min: 6, max: 24})
    },
    repeatPassword: function(value, passwordValue) {
        return !isEmpty(value) && isLength(value, {min: 6, max: 24}) && isEqual(value, passwordValue)
    }
}

/**
 * Validate if an input is correct
 * 
 * @param {String} key
 * @param {String} value
 * 
 * @returns {boolean} True if value is okay and false if not
 */
export default function validate(key, value) {
    const lowercaseKey = toLower(key)

    if (!has(validator, lowercaseKey)) {
        return true
    }

    return validator[lowercaseKey](value)
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