import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';
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

    // Check if the token is expired
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    if (tokenPayload.exp < Date.now() / 1000) {
      console.error('Token has expired');
      setError('Token has expired');

      // Refresh the token
      const auth = new google.auth.GoogleAuth({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        redirect_uri: 'https://wrappedtube.vercel.app',
      });

      auth.refreshToken(token).then((tokens) => {
        const newToken = tokens.token;
        localStorage.setItem('google_token', newToken);
        console.log('New token:', newToken);

        // Retry the API request with the new token
        const getUserSubscriptions = async () => {
          try {
            const data = await fetchUserSubscriptions(newToken);
            if (data.length) {
              setSubscriptions(data);
            } else {
              setError('No subscriptions found');
            }
          } catch (error) {
            console.error('Error fetching user subscriptions:', error.message);
            setError('Failed to fetch user subscriptions: ' + error.message);
          }
        };

        getUserSubscriptions();
      }).catch((error) => {
        console.error('Error refreshing token:', error);
        setError('Failed to refresh token: ' + error.message);
      });

      return;
    }

    const getUserSubscriptions = async () => {
      try {
        const data = await fetchUserSubscriptions(token);
        if (data.length) {
          setSubscriptions(data);
        } else {
          setError('No subscriptions found');
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