import axios from 'axios';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const fetchYouTubeData = async (token) => {
  const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&mySubscribers=true&key=${apiKey}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};