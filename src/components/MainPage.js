import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../api/youtube'; // Ensure this path is correct

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
        {subscriptions.map((sub) => (
          <li key={sub.id} className='d-flex align-items-center gap-3'>
            <img 
              src={sub.snippet.thumbnails.default.url} 
              alt={sub.snippet.title} 
              className='rounded-circle img-fluid channel-pic'
            />
            <div>
              <p className='m-0'>{sub.snippet.title}</p>
              <p className='m-0 text-muted'>{sub.category}</p> {/* Displays category name */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;