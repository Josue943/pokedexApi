require('dotenv').config({ path: __dirname + '/../config/dev.env' });
const axios = require('axios').create({ baseURL: 'https://pokeapi.co/api/v2/', validateStatus: () => true });
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
  const data = [...chain.evolves_to.map(({ species }) => ({ order: 2, pokemon: species.url.split('/').slice(-2)[0] }))];
  if (data.length) data.push(...chain.evolves_to[0].evolves_to.map(({ species }) => ({ order: 3, pokemon: species.url.split('/').slice(-2)[0] })));
  return new EvolutionChain({
    _id: id,
    chain: [{ order: 1, pokemon: chain.species.url.split('/').slice(-2)[0] }, ...data],
  });
};

const seed = async () => {
  const quantity = 649; /* 898 475 */

  await mongoose.connect(process.env.MONGO_URL);

  for (const number of Array.from(Array(quantity).keys())) {
    const response = await axios.get(`pokemon/${number + 1}`);
    if (response.status === 200) await Pokemon.create(formatPokemonData(response.data));
  }

  for (const number of Array.from(Array(475).keys())) {
    const response = await axios.get(`evolution-chain/${number + 1}`);
    if (response.status === 200) await EvolutionChain.create(formatEvolutionData(response.data));
  }

  for (const number of Array.from(Array(quantity).keys())) {
    const response = await axios.get(`pokemon-species/${number + 1}`);
    if (response.status === 200) await Specie.create(formatSpecieData(response.data));
  }

  mongoose.disconnect();
  console.log('Done');
};

seed();
