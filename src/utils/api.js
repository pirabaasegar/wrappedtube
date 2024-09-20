import axios from 'axios';

export const fetchYouTubeSubscribers = async (token) => {
  try {
    // Get the channel ID of the authenticated user
    const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        part: 'id',
        mine: true,
      },
    });

    const channelId = channelResponse.data.items[0].id;

    // Fetch subscribers from the channel
    const subscribersResponse = await axios.get('https://www.googleapis.com/youtube/v3/subscriptions', {
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
    const subscribers = subscribersResponse.data.items.map(item => ({
      title: item.snippet.title,
      channelId: item.snippet.resourceId.channelId,
    }));

    return subscribers;
  } catch (error) {
    console.error('Error fetching YouTube subscribers:', error);
    return [];
  }
};