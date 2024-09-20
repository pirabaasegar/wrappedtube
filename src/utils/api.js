import axios from 'axios';

// Function to fetch user subscriptions from YouTube API
export const fetchUserSubscriptions = async (token) => {
  try {
    // Attempt to make the API call
    const subscriptionsResponse = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
      headers: {
        Authorization: `Bearer ${token}`,  // Use the token from localStorage
      },
      params: {
        part: 'snippet',
        maxResults: 10,
        mine: true,
      },
    });

    // Log the API response for debugging purposes
    console.log('API Response:', subscriptionsResponse);

    // Extract relevant data from the response
    const subscriptions = subscriptionsResponse.data.items.map(item => ({
      title: item.snippet.title,
      channelId: item.snippet.resourceId.channelId,
    }));

    return subscriptions;

  } catch (error) {
    // If there's a 401 error, handle it by prompting the user to log in again
    if (error.response && error.response.status === 401) {
      console.error('Access token expired, please log in again');
      localStorage.removeItem('google_token');  // Clear the expired token
      throw new Error('Access token expired');  // Rethrow error to handle in component
    } else {
      console.error('Error fetching subscriptions:', error.message);
      throw error;  // Propagate any other errors
    }
  }
};