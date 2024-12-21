const express = require('express');
const router = express.Router();

// Example API for slot booking
router.get('/api/slots/:gameId', async (req, res) => {
  const gameId = req.params.gameId;
  try {
    // Fetch slots for the given gameId (mock data or database query here)
    const slots = [
      { slotId: 1, time: '10:00 AM', available: true },
      { slotId: 2, time: '12:00 PM', available: false },
    ];
    res.json(slots);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

