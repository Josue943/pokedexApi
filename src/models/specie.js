const mongoose = require('mongoose');

const Specie = mongoose.model(
  'Specie',
  new mongoose.Schema({
    _id: Number,
    egg_groups: {
      type: [String],
    },
    evolution_chain: {
      type: mongoose.Schema.Types.Number,
      ref: 'evolutionchain',
    },
  })
);

module.exports = Specie;
