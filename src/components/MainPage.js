import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../api/youtube';

const MainPage = ({ accessToken }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (accessToken) {
      getSubscriptions(accessToken).then((data) => setSubscriptions(data));
    }
  }, [accessToken]);

  return (
    <div className="container">
      <h1>Your Top Subscribed Channels</h1>
      <ul>
        {subscriptions.map((sub) => (
          <li key={sub.id}>
            <img src={sub.snippet.thumbnails.default.url} alt={sub.snippet.title} />
            <p>{sub.snippet.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;