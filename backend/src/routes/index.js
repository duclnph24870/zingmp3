const apiRoutes = require('./api');
const searchRouter = require('./search');
const songRouter = require('./song');
const playlistRouter = require('./playlist');

function routes (app) {
    app.use('/api',apiRoutes);
    app.use('/search',searchRouter);
    app.use('/song',songRouter);
    app.use('/playlist',playlistRouter);
}

module.exports = routes;