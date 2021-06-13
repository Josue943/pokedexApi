require('dotenv').config({ path: __dirname + '/../config/dev.env' });
const axios = require('axios').create({ baseURL: 'https://pokeapi.co/api/v2/' });
const EvolutionChain = require('./models/evolutionChain');
const mongoose = require('mongoose');
const Pokemon = require('./models/pokemon');
const Specie = require('./models/specie');

const formatPokemonData = ({ abilities, name, height, id, sprites, types, weight }) => {
  return new Pokemon({
    _id: id,
    abilities: abilities.map(({ ability: { name } }) => name),
    height,
    imgUrl: sprites.other.dream_world.front_default,
    name,
    specie: id,
    sprite: sprites.front_default,
    types: types.map(({ type: { name } }) => name),
    weight,
  });
};

const formatSpecieData = ({ egg_groups, id, evolution_chain }) => {
  return new Specie({
    _id: id,
    egg_groups: egg_groups.map(({ name }) => name),
    evolution_chain: evolution_chain.url.split('/').slice(-2)[0],
  });
};

const formatEvolutionData = ({ chain, id }) => {
  return new EvolutionChain({
    _id: id,
    chain: [
      { order: 1, pokemon: chain.species.url.split('/').slice(-2)[0] },
      ...chain.evolves_to.map(({ species }) => ({ order: 2, pokemon: species.url.split('/').slice(-2)[0] })),
      ...chain.evolves_to[0]?.evolves_to?.map(({ species }) => ({ order: 3, pokemon: species.url.split('/').slice(-2)[0] })),
    ],
  });
};

const seed = async () => {
  try {
    const quantity = 649; /* 898 475 */

    await mongoose.connect(process.env.MONGO_URL);

    for (const number of Array.from(Array(quantity).keys())) {
      const { data } = await axios.get(`pokemon/${number + 1}`);
      await Pokemon.create(formatPokemonData(data));
    }

    for (const number of Array.from(Array(475).keys())) {
      console.log(number);
      const { data } = await axios.get(`evolution-chain/${number + 1}`);
      await EvolutionChain.create(formatEvolutionData(data));
    }

    for (const number of Array.from(Array(quantity).keys())) {
      console.log(number);
      const { data } = await axios.get(`pokemon-species/${number + 1}`);
      await Specie.create(formatSpecieData(data));
    }

    mongoose.disconnect();
    console.log('Done');
  } catch (error) {
    console.log(error);
  }
};

seed();
