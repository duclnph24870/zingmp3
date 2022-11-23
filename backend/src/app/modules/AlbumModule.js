const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const AlbumSchema = new Schema({
    idUser: { type: String, require, ref: 'user' },
    idSong: { type: Array, ref: 'song' },
    keyword: { type: Array },
    name: { type: String, require },
    image: { type: String, default: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg" },
    slug: { type: String, slug: 'name' },
}, {
    collection: 'albums',
    timestamps: true,
});

module.exports = mongoose.model('album',AlbumSchema);