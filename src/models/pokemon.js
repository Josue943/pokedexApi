const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  _id: Number,
  abilities: {
    type: [String],
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
  specie: {
    type: mongoose.Schema.Types.Number,
    ref: 'specie',
  },
  sprite: {
    type: String,
    required: true,
  },
  types: {
    type: [String],
  },
  weight: {
    type: Number,
    required: true,
  },
});

pokemonSchema.pre('save', async function (next) {
  const pokemon = this;
  if (!pokemon._id) pokemon._id = (await Pokemon.estimatedDocumentCount()) + 1;
  next();
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = Pokemon;
