import axios from 'axios';

export const fetchUserSubscriptions = async (token) => {
  try {
    // Fetch the user's subscriptions
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

    // Process the response data
    const subscriptions = subscriptionsResponse.data.items.map(item => ({
      title: item.snippet.title,
      channelId: item.snippet.resourceId.channelId,
    }));

    return subscriptions;
  } catch (error) {
    console.error('Error fetching user subscriptions:', error);
    return [];
  }
};