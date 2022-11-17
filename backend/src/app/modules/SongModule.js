const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: { type: String, require },
    keyword: { type: Array , require},
    userId: { type: String , require},
    view: { type: Number , default: 0},
    like: { type: Number , default: 0},
    image: { type: String },
    slug: { type: String, slug: 'name' },
}, {
    collection: 'songs',
    timestamps: true
});
// const Song = new Schema({
//     name: { type: String },
//     userId: { type: String, ref: 'user' },
//     view: { type: Number },
//     like: { type: Number },
//     image: { type: String },
// }, {
//     collection: 'songs',
//     timestamps: true
// });

// const SongModule = mongoose.model('song',Song);
// for(let i = 0; i < 5; i++) { 
//     SongModule.create({
//         name: 'Test song'+ i,
//         userId: '6373b048075b790c5bf2d4d0',
//         view: 255,
//         like: 255,
//         image: 'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_webp/covers/d/0/d05f9b3c87cf7ccda468174b28757489_1495770525.jpg',
//     })
// }

module.exports = mongoose.model('song',SongSchema);