const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const removeVietnameseTones = require('../../service/removeVietnames');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const SongSchema = new Schema({
    idUser: { type: Array, ref: "user", require },
    idCountry: { type: String, require, ref: 'country' },
    idCateGroup: { type: Array, require, ref: 'categoryGroup' },
    idAlbum: { type: Array, require, ref: 'album' },
    name: { type: String, require },
    image: { type: String ,default: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"},
    audio: { type: String, require },
    keyword: { type: Array },
    like: { type: Number , default: 0},
    view: { type: Number , default: 0},
    slug: { type: String, slug: 'name',unique: true },
}, {
    collection: 'songs',
    timestamps: true
});

SongSchema.pre('save', function (next) {
    this.keyword[0] = removeVietnameseTones(this.name);
    next();
});

module.exports = mongoose.model('song',SongSchema);