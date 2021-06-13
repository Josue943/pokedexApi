const mongoose = require('mongoose');

const Specie = mongoose.model(
  'Specie',
  new mongoose.Schema({
    _id: Number,
    egg_groups: {
      type: [String],
    },
    evolves_from_species: {
      type: mongoose.Schema.Types.Number,
    },
  })
);

module.exports = Specie;
