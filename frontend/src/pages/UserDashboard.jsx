import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserDashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTickets();
  }, [user, navigate]);

  const fetchTickets = async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tickets', { title, description });
      setTickets([res.data, ...tickets]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create ticket');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Open': return 'badge-open';
      case 'In Progress': return 'badge-in-progress';
      case 'Resolved': return 'badge-resolved';
      default: return '';
    }
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div>
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Create New Ticket</h3>
            {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '0.25rem' }}>{error}</div>}
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Subject</label>
                <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" rows="5" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Submit Ticket</button>
            </form>
          </div>
        </div>

        <div>
          <h2 className="title">My Tickets</h2>
          <div className="card">
            {tickets.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>You haven't submitted any tickets yet.</p>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(ticket => (
                      <tr key={ticket._id}>
                        <td style={{ fontWeight: 500 }}>{ticket.title}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>{ticket.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
