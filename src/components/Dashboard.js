import React, { useEffect, useState } from 'react';
import { fetchUserSubscriptions } from '../utils/api';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    console.log('Stored token:', token);
    
    if (!token) {
      console.error('No valid token found');
      setError('No valid token found');
      return;
    }
  
    const getUserSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions(token);
        if (data.length) {
          setSubscriptions(data);
        } else {
          throw new Error('No subscriptions found');
        }
      } catch (error) {
        console.error('Error fetching user subscriptions:', error.message);
        setError('Failed to fetch user subscriptions: ' + error.message);
      }
    };
  
    getUserSubscriptions();
  }, []);

  return (
    <div>
      <h2>Your Top 10 Subscribed Channels</h2>
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