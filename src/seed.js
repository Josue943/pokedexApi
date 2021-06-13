const axios = require('axios');
const mongoose = require('mongoose');
const mongoURL = require('config').get('mongoURL');
const Pokemon = require('./models/pokemon');
const Specie = require('./models/specie');

const seed = async () => {
  try {
    const quantity = 2;
    const baseUrl = 'https://pokeapi.co/api/v2/';
    //getting data from api
    const pokemonPromises = await Promise.all(Array.from(Array(quantity).keys()).map(number => axios.get(`${baseUrl}pokemon/${number + 1}`)));
    const speciePromises = await Promise.all(Array.from(Array(quantity).keys()).map(number => axios.get(`${baseUrl}pokemon-species/${number + 1}`)));

    await mongoose.connect(mongoURL);

    //transform the data, take what we need for the project and insert
    await Pokemon.insertMany(
      pokemonPromises.map(
        ({ data: { abilities, name, height, id, sprites, types, weight } }) =>
          new Pokemon({
            _id: id,
            abilities: abilities.map(({ ability: { name } }) => name),
            height,
            imgUrl: sprites.other.dream_world.front_default,
            name,
            specie: id,
            sprite: sprites.front_default,
            types: types.map(({ type: { name } }) => name),
            weight,
          })
      )
    );

    await Specie.insertMany(
      speciePromises.map(
        ({ data: { egg_groups, id, evolves_from_species } }) =>
          new Specie({
            _id: id,
            egg_group: egg_groups.map(({ name }) => name),
            evolves_from_species: evolves_from_species.url.split('/').slice(-2)[0],
          })
      )
    );

    mongoose.disconnect();
    console.log('Done');
  } catch (error) {
    console.log(error);
  }
};

seed();
