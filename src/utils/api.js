import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const fetchYouTubeData = async (token) => {
  try {
    // Step 1: Get the channel ID using the token
    const channelResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=id&mine=true`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      throw new Error('Channel not found');
    }

    const channelId = channelResponse.data.items[0].id;

    // Step 2: Fetch videos from the channel
    const videosResponse = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${apiKey}&order=date`);

    return videosResponse.data;
  } catch (error) {
    console.error('Error fetching YouTube data:', error.response ? error.response.data : error.message);
    throw error;
  }
};