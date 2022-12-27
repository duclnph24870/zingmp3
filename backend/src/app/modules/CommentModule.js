const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.plugin(require('mongoose-autopopulate'));

const CommentSchema = new Schema({
    idUser: { type: String, require, ref: 'user', autopopulate: {select: 'userName image'} },
    idSong: { type: String, ref: 'song' },
    content: { type: String, require, minLength: 1 },
    like: { type: Array, default: [] },
    disLike: { type: Array, default: [] },
}, {
    collection: 'comments',
    timestamps: true,
});

module.exports = mongoose.model('comment',CommentSchema);