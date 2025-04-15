import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const ContactMessages = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchMessages();
    }
  }, [statusFilter, user]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching messages with token:', localStorage.getItem('token'));
      const response = await contactAPI.getAll();
      console.log('Messages response:', response);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (messageId, newStatus) => {
    try {
      await contactAPI.update(messageId, { status: newStatus });
      fetchMessages();
    } catch (err) {
      setError('Failed to update message status.');
      console.error('Error updating status:', err);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!selectedMessage || !adminResponse.trim()) return;

    try {
      await contactAPI.update(selectedMessage._id, {
        adminResponse: adminResponse.trim(),
        status: 'replied'
      });
      
      setSuccessMessage('Response sent successfully!');
      setAdminResponse('');
      setSelectedMessage(null);
      fetchMessages();
      
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to send response. Please try again.');
      console.error('Error sending response:', err);
    }
  };

  const filteredMessages = statusFilter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === statusFilter);

  if (!user || user.role !== 'admin') {
    return (
      <div className="admin-dashboard">
        <div className="error-message">
          You do not have permission to view this page.
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Contact Messages</h1>
        <div className="filter-section">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {loading ? (
        <div className="loading">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="no-messages">No messages found.</div>
      ) : (
        <div className="messages-container">
          <div className="messages-list">
            {filteredMessages.map(message => (
              <div 
                key={message._id} 
                className={`message-card ${message.status}`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="message-header">
                  <h3>{message.subject}</h3>
                  <span className={`status-badge ${message.status}`}>
                    {message.status}
                  </span>
                </div>
                <p className="sender-info">
                  From: {message.name} ({message.email})
                </p>
                <p className="message-preview">
                  {message.message.substring(0, 100)}...
                </p>
                <p className="message-date">
                  {new Date(message.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          {selectedMessage && (
            <div className="message-detail">
              <div className="message-detail-header">
                <h2>{selectedMessage.subject}</h2>
                <button 
                  className="close-button"
                  onClick={() => setSelectedMessage(null)}
                >
                  ×
                </button>
              </div>
              
              <div className="message-info">
                <p><strong>From:</strong> {selectedMessage.name}</p>
                <p><strong>Email:</strong> {selectedMessage.email}</p>
                <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
              </div>

              <div className="message-content">
                <h3>Message:</h3>
                <p>{selectedMessage.message}</p>
              </div>

              {selectedMessage.adminResponse && (
                <div className="admin-response">
                  <h3>Your Response:</h3>
                  <p>{selectedMessage.adminResponse.message}</p>
                  <p className="response-date">
                    Sent on: {new Date(selectedMessage.adminResponse.repliedAt).toLocaleString()}
                  </p>
                </div>
              )}

              <form onSubmit={handleReply} className="reply-form">
                <h3>Reply to Message</h3>
                <textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder="Type your response here..."
                  required
                />
                <div className="button-group">
                  <button 
                    type="button" 
                    className="mark-read"
                    onClick={() => handleStatusChange(selectedMessage._id, 'read')}
                  >
                    Mark as Read
                  </button>
                  <button type="submit" className="send-reply">
                    Send Response
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactMessages; 