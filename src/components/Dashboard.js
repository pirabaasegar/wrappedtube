import React, { useEffect, useState } from 'react';
import { fetchUserSubscriptions } from '../utils/api';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    
    if (!token) {
      setError('No valid token found');
      return;
    }

    const fetchSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions(token);
        setSubscriptions(data.length ? data : []);
      } catch (error) {
        setError('Failed to fetch user subscriptions');
      }
    };

    fetchSubscriptions();
  }, []);

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