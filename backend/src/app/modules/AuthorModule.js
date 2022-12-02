const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const AuthorSchema = new Schema({
    idCountry: { type: String, require , ref: 'country' },
    name: { type: String, require },
    like: { type: Number, default: 0 },
    image: { type: String, require },
    gender: { type: Number, require },
    slug: { type: String, unique: true, slug: 'name' },
    keyword: { type: Array, default: [] }
},{
    collection: 'author',
    timestamps: true
});

module.exports = mongoose.model('author', AuthorSchema);