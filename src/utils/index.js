import {isEmpty} from 'lodash';

/**
 * Call this function to load state from browser local storage
 */
export function loadState(state) {
    try {
        const serializedSate = localStorage.getItem(state);
        if (serializedSate === null) {
            return {};
        }

        return JSON.parse(serializedSate);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to save state into browser local storage
 * @param {*} state
 */
export function saveState(key, value) {
    try {
        const serializedSate = JSON.stringify(value);
        localStorage.setItem(key, serializedSate);
    } catch (error) {
        return error;
    }
}
/**
 * Call this function to save token into browser local storage
 * @param {*} state
 */

export function saveToken(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to load state from browser local storage
 */
export function loadFromLocalStorage(key) {
    try {
        const serializedSate = localStorage.getItem(key);
        if (isEmpty(serializedSate)) {
            return undefined;
        }
        return JSON.parse(serializedSate);
    } catch (error) {
        return error;
    }
}

/**
 * Call this function to save state into browser local storage
 * @param {*} state
 */
export function saveIntoLocalStorage(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return null;
    }
}