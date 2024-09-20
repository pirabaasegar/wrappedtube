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
      console.error('Access token expired, please log in again');
      localStorage.removeItem('google_token');  // Clear the expired token
      throw new Error('Access token expired, please log in again');
    } else {
      console.error('Error fetching subscriptions:', error.message);
      throw error;  // Throw the error if it's not related to token expiration
    }
  }
};