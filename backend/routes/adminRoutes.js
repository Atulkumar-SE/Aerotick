const express = require('express');
const router = express.Router();
const { getAllTickets, updateTicketStatus } = require('../controllers/ticketController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/tickets')
  .get(protect, admin, getAllTickets);

router.route('/tickets/:id')
  .put(protect, admin, updateTicketStatus);

module.exports = router;
