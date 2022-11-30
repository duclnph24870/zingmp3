const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayListSchema = new Schema({
    idUser: { type: String, require, ref: 'user' },
    idSong: { type: Array, ref: 'song',default: []},
    name: { type: String, require },
    image: { type: String, default: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg" },
    status: { type: Number, default: 1 },
}, {
    collection: 'playList',
    timestamps: true,
});

module.exports = mongoose.model('playList',PlayListSchema);