import React, { useEffect, useState } from 'react';
import { fetchUserSubscriptions } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // To redirect the user to the login page

  useEffect(() => {
    const token = localStorage.getItem('google_token');

    if (!token) {
      setError('No valid token found');
      navigate('/');  // Redirect to login page if no token exists
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions(token);
        setSubscriptions(data.length ? data : []);
      } catch (err) {
        setError('Please log in again.');
        navigate('/');  // Redirect to login page on error (e.g., token expired)
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