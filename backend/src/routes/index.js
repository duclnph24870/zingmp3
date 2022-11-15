const apiRoutes = require('./api');

function routes (app) {
    app.use('/api',apiRoutes);
}

module.exports = routes;