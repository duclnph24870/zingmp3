const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3131;
const routes = require('./routes');
const db = require('./config/db');
const path  = require('path');

db.connect();
app.use(express.static(path.join(__dirname,'/asset')));

app.use(cors({ origin: true }),express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

routes(app);

app.listen(port, () => {
    console.log('http://localhost:'+ port);
})