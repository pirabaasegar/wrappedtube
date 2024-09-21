import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../api/youtube';

const formatSubscribers = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const MainPage = ({ accessToken }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (accessToken) {
        const data = await getSubscriptions(accessToken);
        setSubscriptions(data);
      }
    };

    fetchSubscriptions();
  }, [accessToken]);

  return (
    <div className="container">
      <h1 className='fw-bold'>Your Top Subscribed</h1>
      <ul className='list-unstyled d-flex flex-column gap-2'>
        {subscriptions.map((sub, index) => (
          <li key={sub.id} className='d-flex align-items-center gap-3'>
            <div style={{ minWidth: '22px' }}>
              <p className="text-muted text-end m-0 me-2 d-flex align-items-center justify-content-center">{index + 1}</p>
            </div>
            <img 
              src={sub.snippet.thumbnails.default.url} 
              alt={sub.snippet.title} 
              className='rounded-circle img-fluid shadown channel-pic'
            />
            <div>
              <p className='m-0 fw-medium'>{sub.snippet.title}</p>
              <p className='m-0 text-muted'>{formatSubscribers(sub.subscriberCount)} subscribers</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;