const apiRoutes = require('./api');
const searchRouter = require('./search');

function routes (app) {
    app.use('/api',apiRoutes);
    app.use('/search',searchRouter);
}

module.exports = routes;