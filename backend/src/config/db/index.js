const mongoose = require('mongoose');
require('dotenv').config();


async function connect () {
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.DB_LOCAL_URL);
        console.log('Server connect success!');
    } catch (error) {
        console.log(error);
        console.log('Server connect error!');
    }
}

module.exports = {
    connect
}