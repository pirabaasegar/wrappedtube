import axios from 'axios';

export const fetchYouTubeData = async (token) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true', {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });

  return response.data;
};