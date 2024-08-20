"use strict";

const mongoose = require('mongoose');

module.exports = async() => {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('### DB is CONNECTED ### -',connect.connection.host,connect.connection.name);

}