const axios = require('axios');
const mongoose = require('mongoose');
const mongoURL = require('config').get('mongoURL');
const Pokemon = require('./models/pokemon');

const seed = async () => {
  try {
    const promises = Array.from(Array(2).keys()).map(number => axios.get(`https://pokeapi.co/api/v2/pokemon/${number + 1}`));
    const response = await Promise.all(promises);
    await mongoose.connect(mongoURL);

    //transform the data and insert
    await Pokemon.insertMany(
      response.map(
        ({ data: { name, height, id, sprites, weight } }) =>
          new Pokemon({ name, height, weight, pokedexId: id, sprite: sprites.front_default, imgUrl: sprites.other.dream_world.front_default })
      )
    );

    mongoose.disconnect();
    console.log('Done');
  } catch (error) {
    console.log(error);
  }
};

seed();
