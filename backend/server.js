const app = require('./src');
require('dotenv').config();
const port = process.env.PORT || 3131;
app.use('/', (req,res) => {
    return res.send('server on');
});
app.listen(port, () => {
    console.log('http://localhost:'+port);
});
