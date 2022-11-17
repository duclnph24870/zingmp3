const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3131;
const routes = require('./routes');
const db = require('./config/db');

app.use(cors({ origin: true }),express.json(),express.urlencoded({ extended: true }));
app.use(morgan('combined'));
db.connect();

routes(app);

app.listen(port, () => {
    console.log('http://localhost:'+ port);
})