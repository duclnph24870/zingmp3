const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const UserSchema = new Schema({
    idCountry: { type:String, require, ref: "country" },
    userName: { type: String, require },
    email: { type: String ,require},
    password: { type: String ,require},
    role: { type: Number ,require},
    image: { type: String },
    gender: { type: String ,require},
    description: { type: String ,default: ''},
    status: { type: Number, default: 1 },
    slug: { type: String, slug: 'userName',unique: true },
    follow: { type: Number ,default: 0},
    birthday: { type: Date ,require},
    keyword: { type: Array ,require},
}, {
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('user',UserSchema);