
import express from 'express';
import pokemon from './schema/pokemon.js';

import './connect.js'

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/pokemons', async (req, res) => {
  try{
    const pokemons = await pokemon.find({});
    res.json(pokemons);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/pokemonsByPage/:page', async (req, res) => {
  try{
    const page = parseInt(req.params.id, 1);
    const pokemons = await pokemon.find({  })
                                  .limit(20)
                                  .skip(20*page);
    if (pokemons) {
      res.json(pokemons);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error'});
  }
})

app.get('/pokemons/:id', async (req, res) => {
  try{
    const pokeId = parseInt(req.params.id, 10);
    const poke = await pokemon.findOne({ id: pokeId });
    if (poke) {
      res.json(poke);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/goodbye', (req, res) => {
  res.send('Goodbye Moon Man!');
});


console.log('Server is set up. Ready to start listening on a port.');

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});