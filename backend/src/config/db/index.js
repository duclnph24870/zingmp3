const mongoose = require('mongoose');

async function connect () {
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect('mongodb+srv://duclnph24870:ngocduc13102001@zingmp3clone.mzfoxwc.mongodb.net/zingmp3ph24870');
        console.log('Server connect success!');
    } catch (error) {
        console.log(error);
        console.log('Server connect error!');
    }
}

module.exports = {
    connect
}