/**
 * Created by igor on 22.04.17.
 */

import {save, get} from '../utils/Req';

/**
 * Send data for save.
 * @param {object} data
 */
const send = (data) => new Promise((ok, bad) => save('/send', data).then(ok, bad));
/**
 * Get all sends.
 * @param {object}data
 */
const all = (data) => new Promise((ok, bad) => get('/sends', data).then(ok, bad));

export {send, all};
