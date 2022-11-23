const userRoutes = require('./user');
const searchRouter = require('./search');
const songRouter = require('./song');
const playlistRouter = require('./playlist');
const countryRouter = require('./country');
const uploadRouter = require('./upload');

function routes (app) {
    app.use('/user',userRoutes);
    app.use('/search',searchRouter);
    app.use('/song',songRouter);
    app.use('/playlist',playlistRouter);
    app.use('/country',countryRouter);
    app.use('/upload',uploadRouter);
}

module.exports = routes;