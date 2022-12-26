const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const UserSchema = new Schema({
    idCountry: { type:String, require, ref: "country" },
    userName: { type: String, require },
    email: { type: String ,require, unique: true},
    password: { type: String ,require},
    role: { type: Number ,default: 0},
    image: { type: String, default: 'https://avatar.talk.zdn.vn/default.jpg'},
    gender: { type: Number ,require},
    description: { type: String ,default: ''},
    status: { type: Number, default: 1 },
    slug: { type: String, slug: 'userName',unique: true },
    follow: { type: Number ,default: 0},
    birthday: { type: Date },
    liked: { type: Array, default: [] },
}, {
    collection: 'users',
    timestamps: true
});

UserSchema.methods = {
    decodedPassword (password) {
        if (!password) return undefined;
        console.log(crypto.createHmac('sha256',process.env.CRYPTO_PASSWORD).update(password).digest("hex"));
        return crypto.createHmac('sha256',process.env.CRYPTO_PASSWORD).update(password).digest("hex");
    },
    checkPassword (password) {
        if (!password) return undefined;
        let decodedPass = crypto.createHmac('sha256',process.env.CRYPTO_PASSWORD).update(password).digest("hex");
        return decodedPass === this.password;
    }
}

UserSchema.pre('save', function (next) {
    this.password = this.decodedPassword(this.password);
    next();
});

UserSchema.pre('updateOne', function (next) {
    const update = this.getUpdate();
    if (update.password) {
        this.password = this.decodedPassword(this.password);
    }
    next();
});

module.exports = mongoose.model('user',UserSchema);
