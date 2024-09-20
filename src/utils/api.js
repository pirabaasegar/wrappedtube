import axios from 'axios';

export const fetchYouTubeData = async (token) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
  }
};