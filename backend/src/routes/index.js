const userRoutes = require('./user');
const searchRouter = require('./search');
const songRouter = require('./song');
const playlistRouter = require('./playlist');
const countryRouter = require('./country');
const alBumRouter = require('./album');
const categoryGroupRouter = require('./categoryGroup');
const categoryRouter = require('./category');
const commentRouter = require('./comment');
const authorRouter = require('./author');
const path  = require('path');


function routes (app) {
    app.use('/user',userRoutes);
    app.use('/search',searchRouter);
    app.use('/song',songRouter);
    app.use('/playlist',playlistRouter);
    app.use('/country',countryRouter);
    app.use('/album',alBumRouter);
    app.use('/category',categoryRouter);
    app.use('/categoryGroup',categoryGroupRouter);
    app.use('/comment',commentRouter);
    app.use('/author',authorRouter);
}

module.exports = routes;