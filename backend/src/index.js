const express = require('express');
const cors = require('cors');
const app = express();
const port = 3131;
const routes = require('./routes');
const db = require('./config/db');

db.connect();
app.use(cors({ origin: true }),express.json(),express.urlencoded({ extended: true }));

routes(app);

app.listen(port, () => {
    console.log('http://localhost:'+ port);
})