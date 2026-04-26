const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Please add title and description' });
  }

  const ticket = await Ticket.create({
    title,
    description,
    user: req.user.id,
    status: 'Open',
  });

  res.status(201).json(ticket);
};

const getUserTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tickets);
};

const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find({}).populate('user', 'name email').sort({ createdAt: -1 });
  res.json(tickets);
};

const updateTicketStatus = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    return res.status(404).json({ message: 'Ticket not found' });
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  ).populate('user', 'name email');

  res.json(updatedTicket);
};

module.exports = { createTicket, getUserTickets, getAllTickets, updateTicketStatus };
