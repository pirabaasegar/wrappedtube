import React, { useEffect, useState } from 'react';
import { fetchUserSubscriptions } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // To navigate to login if token is invalid

  useEffect(() => {
    const token = localStorage.getItem('google_token');

    if (!token) {
      setError('No valid token found');
      navigate('/');  // Redirect to login page if no token is found
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions(token);
        setSubscriptions(data.length ? data : []);
      } catch (error) {
        setError('Failed to fetch user subscriptions. Please log in again.');
        localStorage.removeItem('google_token');  // Clear token if expired
        navigate('/');  // Redirect to login page
      }
    };

    fetchSubscriptions();
  }, [navigate]);

  return (
    <div>
      {error && <p>{error}</p>}
      <ul>
        {subscriptions.map(sub => (
          <li key={sub.channelId}>{sub.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;