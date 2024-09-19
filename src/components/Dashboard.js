import React, { useEffect, useState } from 'react';
import { fetchYouTubeData } from '../utils/api'; // Ensure this path is correct

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('google_token'); // Retrieve the token here

    const getYouTubeData = async () => {
      try {
        const data = await fetchYouTubeData(token);
        setVideos(data.items); // Assuming data.items contains the videos
      } catch (error) {
        console.error('Error fetching YouTube data:', error);
        setError('Failed to fetch YouTube data');
      }
    };

    if (token) {
      getYouTubeData(); // Call the function if the token exists
    } else {
      setError('No valid token found');
    }
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