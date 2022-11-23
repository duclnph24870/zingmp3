const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const CountrySchema = new Schema({
    name: { type: String, require: true },
    image: { type: String, require: true },
    slug: { type: String, slug: 'name' },
}, {
    collection: 'country',
    timestamps: true,
});

module.exports = mongoose.model('country',CountrySchema);