"use strict";

const crypto = require('node:crypto');

const loopEncrpt = 10000;
const key = process.env.SECRET_KEY;
const charLength = 32;
const encptType = 'sha512'

const passwordEncrypter = (password) => {
    return crypto.pbkdf2Sync(password,key,loopEncrpt,charLength,encptType).toString('hex');
}
module.exports = passwordEncrypter;