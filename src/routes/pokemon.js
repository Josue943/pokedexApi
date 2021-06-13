const router = require('express').Router();
const Pokemon = require('../models/pokemon');

router.get('', async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = 25;
    const query = {};
    const dataRequired = 'pokedexId name sprite';
    //
    const pokemons = await Pokemon.find(query, null, { skip: limit * (page - 1) });
    res.send(pokemons);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
