const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const CategoryGroupSchema = new Schema({
    idUser: { type: String, require, ref: 'user' },
    name: { type: String, require },
    image: { type: String, require },
    slug: { type: String, slug: 'name' },
}, {
    collection: 'categoryGroup',
    timestamps: true,
});

module.exports = mongoose.model('categoryGroup',CategoryGroupSchema);