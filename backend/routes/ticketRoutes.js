const express = require('express');
const router = express.Router();
const { createTicket, getUserTickets } = require('../controllers/ticketController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createTicket)
  .get(protect, getUserTickets);

module.exports = router;
