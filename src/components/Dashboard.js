import React, { useEffect, useState } from 'react';
import { fetchYouTubeSubscribers } from '../utils/api';

const Dashboard = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    console.log('Stored token:', token);
    
    if (!token) {
      console.error('No valid token found');
      return;
    }
  
    const getYouTubeSubscribers = async () => {
      try {
        const data = await fetchYouTubeSubscribers(token);
        if (data.length) {
          setSubscribers(data);
        } else {
          throw new Error('No subscribers found');
        }
      } catch (error) {
        console.error('Error fetching YouTube subscribers:', error.message);
        setError('Failed to fetch YouTube subscribers: ' + error.message);
      }
    };
  
    getYouTubeSubscribers();
  }, []);

  return (
    <div>
      <h2>Your Top 10 Subscribers</h2>
      {error && <p>{error}</p>}
      <ul>
        {subscribers.map(subscriber => (
          <li key={subscriber.channelId}>{subscriber.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;