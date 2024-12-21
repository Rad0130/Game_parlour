// Fetch available slots for a game
// app.get('/api/slots/:gameId', async (req, res) => {
//     const { gameId } = req.params;
//     const slots = await db.query('SELECT * FROM slots WHERE game_id = ? AND is_booked = 0', [gameId]);
//     res.json(slots);
// });

// // Book a slot
// app.post('/api/slots/book', authenticate, async (req, res) => {
//     const { slotId } = req.body;
//     const { userId } = req.user;

//     try {
//         await db.query('UPDATE slots SET is_booked = 1, user_id = ? WHERE id = ?', [userId, slotId]);
//         res.json({ message: 'Slot booked successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to book slot' });
//     }
// });

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

