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

    console.log('API Response:', subscriptionsResponse);  // Log the API response to verify data

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
        return await fetchUserSubscriptions(newToken);  // Retry with new token
      } else {
        console.error('Failed to refresh token, clearing stored tokens');
        localStorage.removeItem('google_refresh_token');
        localStorage.removeItem('google_token');
        throw new Error('Failed to refresh token');
      }
    } else {
      console.error('Error fetching subscriptions:', error.message);
      throw error;  // Throw the error if it's not related to token expiration
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
    
    // Additional logging for debugging
    if (error.response && error.response.data) {
      console.error('Refresh token error details:', error.response.data);
    }
    
    return null;
  }
};