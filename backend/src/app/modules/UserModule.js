const mongoose = require('mongoose');
const crypto = require('crypto');
require('dotenv').config();
const removeVietnameseTones = require('../../service/removeVietnames');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const UserSchema = new Schema({
    idCountry: { type:String, require, ref: "country" },
    userName: { type: String, require },
    email: { type: String ,require},
    password: { type: String ,require},
    role: { type: Number ,require,default: 0},
    image: { type: String },
    gender: { type: Number ,require},
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

UserSchema.methods = {
    decodedPassword (password) {
        console.log('decoded pass', password);
        if (!password) return undefined;
        console.log(crypto.createHmac('sha256',process.env.CRYPTO_PASSWORD).update(password).digest("hex"));
        return crypto.createHmac('sha256',process.env.CRYPTO_PASSWORD).update(password).digest("hex");
    }
}

UserSchema.pre('save', function (next) {
    this.password = this.decodedPassword(this.password);
    this.keyword[0] = removeVietnameseTones(this.userName);
    next();
})

module.exports = mongoose.model('user',UserSchema);
