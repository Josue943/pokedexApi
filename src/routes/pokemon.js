const Pokemon = require('../models/pokemon');
const Specie = require('../models/specie');
const router = require('express').Router();

router.get('', async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = 25;
    const query = {};
    if (req.query.search) query.name = { $regex: req.query.search };
    const dataRequired = 'name sprite';
    //
    const pokemons = await Pokemon.find(query, dataRequired, { skip: limit * (page - 1), sort: { pokedexId: 1 } });
    res.send(pokemons);
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id, null, { populate: { path: 'specie', model: Specie, select: 'egg_groups' } });
    if (!pokemon) return res.status(404).send();
    res.send(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post('', async (req, res) => {
  try {
    const pokemon = new Pokemon(req.body);
    await pokemon.save();
    res.status(201).send(pokemon);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Invalid data' });
  }
});

module.exports = router;
