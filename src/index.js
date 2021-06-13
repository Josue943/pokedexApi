require('dotenv').config({ path: __dirname + '/../config/dev.env' });
const app = require('express')();
const port = process.env.PORT;

//db
require('./db');
require('./routes')(app);

app.listen(port, () => console.log('App running at port ' + port));
