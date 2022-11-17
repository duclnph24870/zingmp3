const SongModule = require('../modules/SongModule');
const UserModule = require('../modules/UserModule');
const removeVietnameseTones = require('../../service/removeVietnames');

const SearchController = {
    // [GET] /search
    async get (req, res) {

        const pattern = removeVietnameseTones(req.query.q); //g
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
                    // user query
                    let userQuery = UserModule.find({
                        keyword: { $regex: regex },
                    })
                        .select(['-password'])
                        .limit(amount);


                    // song query
                    let songQuery = SongModule.find({
                        keyword: { $regex: regex },
                    })
                        .limit(amount);

                    [userResult,songResult] = await Promise.all([userQuery, songQuery]);
                    result = {
                        errCode: 0,
                        userResult,
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
    }
}

module.exports = SearchController;