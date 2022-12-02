const SongModule = require('../modules/SongModule');
const AuthorModule = require('../modules/AuthorModule');
const AlbumModule = require('../modules/AlbumModule');
const removeVietnameseTones = require('../../service/removeVietnames');

const SearchController = {
    // [GET] /search
    async get (req, res) {

        const pattern = removeVietnameseTones(req.query.q);
        const regex = new RegExp(
            `${pattern}`,'gi'
        )
        const type = req.query.type;
        const amount = Number(req.query.amount);
        let result = null;
        console.log(regex);
        try {
            switch (type) {
                case 'all':
                    // author query
                    let authorQuery = AuthorModule.find({
                        $or: [{ keyword: regex }, { slug: regex }]
                    })
                        .limit(amount);


                    // song query
                    let songQuery = SongModule.find({
                        $or: [{ keyword: regex }, { slug: regex }]
                    })
                        .limit(amount);

                    [authorResult,songResult] = await Promise.all([authorQuery, songQuery]);
                    result = {
                        errCode: 0,
                        authorResult,
                        songResult
                    }
                    break;
                case 'song':
                    break;
                case 'singer':
                    break;
            }
            return res.status(200).json(result);
        } catch (error) {
            result = {
                errCode: 1,
                error,
            }
            return res.status(404).json(result);
        }
    },

    // [POST] /search
    async search (req,res) {
        let songQuery = null;
        let albumQuery = null;
        let authorQuery = null;
        let searchQuery = []; 

        let { all,album,song,author,keyword,amount } = req.body;
        amount = Number(amount);
        keyword = removeVietnameseTones(keyword);
        console.log(req.body, keyword);

        try {
            if (song || all) {
                songQuery = SongModule.find({
                    keyword: { $regex: keyword},
                })
                .sort({ view: 'desc' })
                .limit(amount);
    
                searchQuery.push(songQuery);
            }
    
            if (author || all) {
                authorQuery = UserModule.find({
                    keyword: { $regex: keyword},
                    role: { $gt: 3 }
                })
                .sort({ follow: 'desc' })
                .limit(amount);
    
                searchQuery.push(authorQuery);
            }
    
            if (album || all) {
                albumQuery = AlbumModule.find({
                    keyword: { $regex: keyword }
                })
                .limit(amount);
    
                searchQuery.push(albumQuery);
            }   

            const result = await Promise.all(searchQuery);
            return res.status(200).json({ ... result });
        } catch (error) {
            return res.status(500).json({
                errCode: 1,
                error,
            })
        }

    }
}

module.exports = SearchController;