import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3';

export const getSubscriptions = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/subscriptions`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet',
        mine: true,
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
};

export const getMostWatchedVideos = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}/videos`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        part: 'snippet,contentDetails',
        maxResults: 10,
        chart: 'mostPopular',
        mine: true,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

export const calculateWatchTime = async (videos) => {
  let totalWatchTime = 0;

  videos.forEach((video) => {
    const duration = video.contentDetails.duration;
    const hours = parseDuration(duration);
    totalWatchTime += hours;
  });

  return totalWatchTime;
};

const parseDuration = (duration) => {
  const match = /PT(\d+H)?(\d+M)?(\d+S)?/.exec(duration);
  const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
  const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;

  return hours + minutes / 60 + seconds / 3600;
};