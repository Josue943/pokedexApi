const mongoose = require('mongoose');
const url = require('config').get('mongoURL');

mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
