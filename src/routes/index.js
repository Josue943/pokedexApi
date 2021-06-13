const express = require('express');
//routes
const pokemon = require('../routes/pokemon');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/pokemon', pokemon);
};
