const mongoose = require('mongoose');

const Pokemon = mongoose.model(
  'Pokemon',
  new mongoose.Schema({
    abilities: {
      type: Array,
    },
    height: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pokedexId: {
      type: Number,
      required: true,
    },
    sprite: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
    },
    weight: {
      type: Number,
      required: true,
    },
  })
);

module.exports = Pokemon;
