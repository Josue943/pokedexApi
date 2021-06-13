const Pokemon = require('../models/pokemon');
const Specie = require('../models/specie');
const router = require('express').Router();

router.get('', async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = 25;
    const query = {};
    if (req.query.query) query.name = { $regex: req.query.query };
    const dataRequired = 'name sprite';
    //
    const [pokemons, pages] = await Promise.all([
      Pokemon.find(query, dataRequired, { limit, skip: limit * (page - 1), sort: { _id: 1 } }),
      Pokemon.estimatedDocumentCount(),
    ]);
    res.send({ pokemons, pages: Math.ceil(pages / limit) });
  } catch (error) {
    res.status(500).send();
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findById(req.params.id, null, { populate: { path: 'specie', model: Specie, select: 'egg_groups evolution_chain' } });
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
