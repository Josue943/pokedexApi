const cors = require('cors');
const express = require('express');
//routes
const evolution = require('../routes/evolutionChain');
const pokemon = require('../routes/pokemon');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use('/api/pokemons', pokemon);
  app.use('/api/evolution-chains', evolution);
};
