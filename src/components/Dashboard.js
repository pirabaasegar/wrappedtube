import React, { useEffect, useState } from 'react';
import VideoChart from './VideoChart';
import WatchTimeGraph from './WatchTimeGraph';
import { fetchYouTubeData } from '../utils/api';

const Dashboard = () => {
  const [videos, setVideos] = useState([]);
  const [watchTime, setWatchTime] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('google_token');
    if (token) {
      fetchYouTubeData(token).then(data => {
        setVideos(data.videos);
        setWatchTime(data.watchTime);
      });
    }
  }, []);

  return (
    <div>
      <h2>Your YouTube Wrapped</h2>
      <VideoChart data={videos} />
      <WatchTimeGraph data={watchTime} />
    </div>
  );
};

export default Dashboard;