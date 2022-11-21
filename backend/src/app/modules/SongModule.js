const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

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
    keyword: { type: Array , require},
    like: { type: Number , default: 0},
    view: { type: Number , default: 0},
    slug: { type: String, slug: 'name' },
}, {
    collection: 'songs',
    timestamps: true
});

// const SongModule = mongoose.model('song',SongSchema);
//     SongModule.create([
//         {
//             name: 'Tháng 5 không trở lại',
//             userId: '6373b048075b790c5bf2d4d0',
//             keyword: [
//                 "thang 5 khong tro lai",
//             ],
//             view: 0,
//             like: 0,
//             image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg',
//             audio: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/62fb291cb4585d060449/6113262379425634404?authen=exp=1669118999~acl=/62fb291cb4585d060449/*~hmac=2d055ed782575d5648728b4cb59fe03a',
//         },
//         {
//             name: 'Tuổi thơ tôi',
//             userId: '6373b048075b790c5bf2d4d0',
//             keyword: [
//                 "tuoi tho toi",
//             ],
//             view: 0,
//             like: 0,
//             image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg',
//             audio: 'https://vnso-zn-23-tf-mp3-s1-m-zmp3.zmdcdn.me/4311b41a965d7f03264c/3922963725868247634?authen=exp=1669119094~acl=/4311b41a965d7f03264c/*~hmac=c1ce79205242f889161eea468257c35d',
//         },
//         {
//             name: 'Công chua bong bóng',
//             userId: '6373b048075b790c5bf2d4d0',
//             keyword: [
//                 "cong chua bong bong",
//             ],
//             view: 0,
//             like: 0,
//             image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg',
//             audio: 'https://vnso-zn-5-tf-mp3-320s1-m-zmp3.zmdcdn.me/1bc6ad421e03f75dae12/637022877297724395?authen=exp=1669118788~acl=/1bc6ad421e03f75dae12/*~hmac=990640241ac270cae58f3f49e3b6f5d9',
//         },
//         {
//             name: 'Tell Ur Mom II',
//             userId: '6373b048075b790c5bf2d4d0',
//             keyword: [
//                 "tell ur mom ii",
//             ],
//             view: 0,
//             like: 0,
//             image: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg',
//             audio: 'https://vnso-zn-16-tf-mp3-320s1-m-zmp3.zmdcdn.me/4508b1bcaafd43a31aec/3046031717241187835?authen=exp=1669119183~acl=/4508b1bcaafd43a31aec/*~hmac=7e996da730df14fd1433fab8d970c6c1',
//         }
//     ])

module.exports = mongoose.model('song',SongSchema);