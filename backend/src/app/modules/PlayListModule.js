const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.plugin(require('mongoose-autopopulate'));

const PlayListSchema = new Schema({
    idUser: { type: String, require, ref: 'user', autopopulate: { select: 'userName _id' } },
    idSong: { type: Array, ref: 'song',default: [], autopopulate: { maxDepth: 1 } },
    name: { type: String, require },
    image: { type: String, default: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg" },
    status: { type: Number, default: 1 },
}, {
    collection: 'playList',
    timestamps: true,
});

PlayListSchema.post('find', function (doc) {
    const newDoc = doc.map(item => {
        let song = item.idSong;
        let result = item;
        if (song.length > 0) {
            result = {
                ... item,
                image: song[0].image,
            }
        }
        return result;
    });

    return newDoc;
});

module.exports = mongoose.model('playList',PlayListSchema);