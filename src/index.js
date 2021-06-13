const app = require('express')();
const port = require('config').get('port');
//db
require('./db');
require('./routes')(app);

app.listen(port, () => console.log('App running at port ' + port));
