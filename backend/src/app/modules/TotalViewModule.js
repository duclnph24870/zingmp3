const mongoose = require('mongoose');
const timeService = require('../../service/time');

const Schema = mongoose.Schema;

const defaultTotal = timeService.createCouter();

const TotalViewSchema = new Schema({
    year: { type: Number,required: true},
    totalView: { type: Array, default: defaultTotal }
}, {
    collection: 'totalView',
    timestamps: true
});

module.exports = mongoose.model('totalView',TotalViewSchema);