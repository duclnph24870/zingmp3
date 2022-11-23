const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    idUser: { type: String, require, ref: 'user' },
    idSong: { type: String, ref: 'song' },
    content: { type: String, require },
    like: { type: Number, default: 0 },
    disLike: { type: Number, default: 0 },
}, {
    collection: 'comments',
    timestamps: true,
});

module.exports = mongoose.model('comment',CommentSchema);