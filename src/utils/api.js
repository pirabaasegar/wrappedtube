import axios from 'axios';

export const fetchUserSubscriptions = async (token) => {
  try {
    const subscriptionsResponse = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        part: 'snippet',
        maxResults: 10,
        mine: true,
      },
    });

    const subscriptions = subscriptionsResponse.data.items.map(item => ({
      title: item.snippet.title,
      channelId: item.snippet.resourceId.channelId,
    }));

    return subscriptions;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Access token expired, trying to refresh token');
      
      const refreshTokenStored = localStorage.getItem('google_refresh_token');
      if (!refreshTokenStored) {
        throw new Error('No refresh token available');
      }

      const newToken = await refreshToken(refreshTokenStored);
      if (newToken) {
        // Retry fetching the subscriptions with the new token
        return await fetchUserSubscriptions(newToken);
      } else {
        throw new Error('Failed to refresh token');
      }
    } else {
      console.error('Error fetching user subscriptions:', error.response ? error.response.data : error.message);
      return []; // Return an empty array on error
    }
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const newToken = response.data.access_token;
    localStorage.setItem('google_token', newToken); // Store the new token
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
    return null;
  }
};