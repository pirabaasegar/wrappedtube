export const fetchYouTubeData = async (token) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
};