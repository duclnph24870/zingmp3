const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const UserModule = new Schema({
    userName: { type: String },
    role: { type: Number },
    email: { type: String },
    password: { type: String },
    description: { type: String },
    slug: { type: String, slug: 'userName',unique: true },
    follow: { type: Number },
    avatar: { type: String },
    birthday: { type: Date },
    sex: { type: String },
}, {
    collection: 'users',
    timestamps: true
});

module.exports = mongoose.model('user',UserModule);