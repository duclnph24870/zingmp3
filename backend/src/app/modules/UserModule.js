const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const UserSchema = new Schema({
    userName: { type: String, require },
    keyword: { type: Array ,require},
    role: { type: Number ,require},
    email: { type: String ,require},
    password: { type: String ,require},
    description: { type: String ,default: ''},
    slug: { type: String, slug: 'userName',unique: true },
    follow: { type: Number ,default: 0},
    avatar: { type: String },
    birthday: { type: Date ,require},
    sex: { type: String ,require},
}, {
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('user',UserSchema);