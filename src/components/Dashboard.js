import React, { useEffect, useState } from 'react';
import { fetchUserSubscriptions, refreshToken } from '../utils/api';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');

    const refreshTokenStored = localStorage.getItem('google_refresh_token');
    console.log('Refresh Token:', refreshTokenStored); // Add this to verify
    if (!refreshTokenStored) {
      throw new Error('No refresh token available');
    }

    if (!token) {
      setError('No valid token found');
      return;
    }

    // Decode the token and check its expiration
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload.exp < Date.now() / 1000) {
      const refresh = async () => {
        const newToken = await refreshToken(refreshTokenStored); // Refresh the token
        if (newToken) {
          fetchSubscriptions(newToken);
        } else {
          setError('Failed to refresh token');
        }
      };
      refresh();
      return;
    }

    const fetchSubscriptions = async (token) => {
      try {
        const data = await fetchUserSubscriptions(token);
        setSubscriptions(data.length ? data : []);
      } catch (error) {
        setError('Failed to fetch user subscriptions');
      }
    };

    fetchSubscriptions(token);
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