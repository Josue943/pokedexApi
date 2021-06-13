const mongoose = require('mongoose');

//model change to make easier to understand and take data
const EvolutionChain = mongoose.model(
  'EvolutionChain',
  new mongoose.Schema({
    _id: Number,
    chain: [
      {
        order: Number,
        pokemon: { type: mongoose.Schema.Types.Number, ref: 'specie' },
      },
    ],
  })
);

module.exports = EvolutionChain;
