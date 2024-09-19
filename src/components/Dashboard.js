import React, { useEffect, useState } from 'react';
import { fetchYouTubeData } from '../utils/api';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    console.log('Token:', token); // Log the token for debugging

    const getYouTubeData = async () => {
      try {
        if (!token) throw new Error('No valid token found');

        const data = await fetchYouTubeData(token);
        if (data.items) {
          setVideos(data.items);
        } else {
          throw new Error('No items found in response');
        }
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        setError('Failed to fetch YouTube data: ' + error.message);
      }
    };

    getYouTubeData();
  }, []);

  return (
    <div>
      <h2>Your YouTube Videos</h2>
      {error && <p>{error}</p>}
      <ul>
        {videos.map(video => (
          <li key={video.id}>{video.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;