const express = require('express');
const router = express.Router();

// Mock database of games
const games = [
  { name: 'GTA5', genre: 'Open-World' },
  { name: 'FIFA', genre: 'Sports' },
  { name: 'Assassin\'s Creed', genre: 'Action' },
  { name: 'Call of Duty', genre: 'Action' }
];

// Search API
router.get('/search', (req, res) => {
  const genre = req.query.genre?.toLowerCase();
  if (!genre) {
    return res.status(400).json({ message: 'Genre is required' });
  }
  
  const filteredGames = games.filter(game => game.genre.toLowerCase() === genre);
  res.json(filteredGames);
});

module.exports = router;
