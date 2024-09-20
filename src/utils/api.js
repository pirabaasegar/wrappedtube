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
  
    console.log('Subscriptions Response:', subscriptionsResponse.data);
  
    const subscriptions = subscriptionsResponse.data.items.map(item => ({
      title: item.snippet.title,
      channelId: item.snippet.resourceId.channelId,
    }));
  
    return subscriptions; // Return the array directly
  } catch (error) {
    console.error('Error fetching user subscriptions:', error.response ? error.response.data : error.message);
    return []; // Return an empty array on error
  }
};