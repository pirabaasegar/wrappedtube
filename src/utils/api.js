import axios from 'axios';

export const fetchYouTubeData = async (token) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&mySubscribers=true', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};