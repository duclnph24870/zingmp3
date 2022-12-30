const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const timeService = require('../../service/time');

const Schema = mongoose.Schema;
mongoose.plugin(slug);
mongoose.plugin(require('mongoose-autopopulate'));

let viewDefault = timeService.createCouter();

const SongSchema = new Schema({
    idAuthor: { type: Array, ref: "author", require, autopopulate: {select: 'name'} },
    idCountry: { type: String, require, ref: 'country' },
    idCateGroup: { type: Array, require, ref: 'categoryGroup' },
    idAlbum: { type: Array, require, ref: 'album' },
    idUser: { type: String,require, ref: 'user' },
    name: { type: String, require },
    image: { type: String ,default: "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/3/2/a/3/32a35f4d26ee56366397c09953f6c269.jpg"},
    audio: { type: String, require },
    keyword: { type: Array },
    view: { type: Array , default: {
        year: new Date().getFullYear(),
        viewDetail: viewDefault
    }},
    totalView: { type: Number, default: 0},
    slug: { type: String, slug: 'name',unique: true },
}, {
    collection: 'songs',
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }
});

SongSchema.virtual("viewMonth").get(function() {
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    // tìm ra bảng view của tháng năm đó
    const viewList = this.view.find(item => item.year === year);
    if (viewList) {
        // tính tổng view của tháng
        const totalMonthView = viewList.viewDetail[month - 1].reduce((init,curr) => init + curr,0);
        
        return totalMonthView;
    }
    return 0;
});

module.exports = mongoose.model('song',SongSchema);