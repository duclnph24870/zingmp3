const PlayListModule = require('../modules/PlayListModule');

class PlayListController {
    // [GET] /playlist/:id (Lấy ra 1 playlist)
    async selectPlayList (req,res) {
        const id = req.params.id;
        try {
            const playlist = await PlayListModule.findById(id);

            return res.status(200).json(playlist);            
        } catch (error) {
            return res.json({
                errCode: 1,
                error,
            })
        }
    }
}

module.exports = new PlayListController;