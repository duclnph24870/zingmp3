const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const CategorySchema = new Schema({
    idUser: { type: String, require, ref: 'user' },
    idCateGroup: { type: String, require, ref: 'categoryGroup' },
    name: { type: String, require },
    image: { type: String, require },
    slug: { type: String, slug: 'name' },
}, {
    collection: 'category',
    timestamps: true,
});

module.exports = mongoose.model('category',CategorySchema);