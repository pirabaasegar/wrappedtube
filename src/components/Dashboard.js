import React, { useEffect } from 'react';
import { fetchYouTubeData } from '../utils/api'; // Make sure this path is correct
import { handleAuthClick, getAccessToken } from '../utils/auth'; // Adjust path accordingly

const Dashboard = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      getAccessToken(code).then((token) => {
        fetchYouTubeData(token).then(data => {
          console.log(data);
        }).catch(error => {
          console.error('Error fetching YouTube data:', error);
        });
      }).catch(error => {
        console.error('Error getting access token:', error);
      });
    } else {
      // If no code, initiate OAuth flow
      handleAuthClick();
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Your dashboard content */}
    </div>
  );
};

export default Dashboard;