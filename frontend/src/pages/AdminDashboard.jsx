import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AdminDashboard = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchTickets();
  }, [user, navigate]);

  const fetchTickets = async () => {
    try {
      const res = await api.get('/admin/tickets');
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.put(`/admin/tickets/${id}`, { status: newStatus });
      setTickets(tickets.map(ticket => ticket._id === id ? res.data : ticket));
    } catch (err) {
      console.error(err);
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
      <h2 className="title">Admin Dashboard - All Tickets</h2>
      <div className="card">
        {tickets.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No tickets found in the system.</p>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Title / Description</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <tr key={ticket._id}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{ticket.user.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ticket.user.email}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{ticket.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {ticket.description}
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(ticket.status)}`}>{ticket.status}</span>
                    </td>
                    <td>
                      <select 
                        className="form-control" 
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', width: 'auto' }}
                        value={ticket.status}
                        onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
