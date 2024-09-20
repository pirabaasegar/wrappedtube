import axios from 'axios';

export const fetchYouTubeData = async (token) => {
  try {
    // Get the channel ID of the authenticated user
    const channelResponse = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        part: 'contentDetails',
        mine: true,
      },
    });

    const channelId = channelResponse.data.items[0].id;

    // Fetch videos from the channel
    const videosResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        part: 'snippet',
        channelId: channelId,
        maxResults: 10,
        order: 'date',
        type: 'video',
      },
    });

    // Process the response data
    const videos = videosResponse.data.items.map(item => ({
      title: item.snippet.title,
      watchTime: Math.random() * 10, // Replace with real data
    }));

    // Generate sample watch time data
    const watchTime = [
      { date: '2024-01-01', watchTime: 5 },
      { date: '2024-02-01', watchTime: 10 },
      // Add more data as needed
    ];

    return { videos, watchTime };
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return { videos: [], watchTime: [] };
  }
};