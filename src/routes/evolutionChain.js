const EvolutionChain = require('../models/evolutionChain');
const Pokemon = require('../models/pokemon');
const router = require('express').Router();

router.get('/:id', async (req, res) => {
  try {
    const evolutionChain = await EvolutionChain.findById(req.params.id, null, {
      populate: {
        path: 'chain.pokemon',
        model: Pokemon,
        select: 'name imgUrl',
      },
    });
    if (!evolutionChain) return res.status(404).send();
    res.send(evolutionChain);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
