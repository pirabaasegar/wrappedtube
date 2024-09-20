import axios from 'axios';

export const fetchYouTubeData = async (token) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true', {
    headers: {
      Authorization: `Bearer ${token}`, // Use Bearer token for authorization
    },
  });

  return response.data;
};