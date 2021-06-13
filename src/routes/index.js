const cors = require('cors');
const express = require('express');
//routes
const pokemon = require('../routes/pokemon');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/pokemons', pokemon);
};
