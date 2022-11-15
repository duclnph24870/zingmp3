const mongoose = require('mongoose');

async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/zingmp3ph24870');
        console.log('Server connect success!');
    } catch (error) {
        console.log('Server connect error!');
    }
}

module.exports = {
    connect
}