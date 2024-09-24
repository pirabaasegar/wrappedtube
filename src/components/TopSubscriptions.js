import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubscriptions } from '../api/youtube';
import { useAuth } from '../hooks/AuthContext';
import Sidenav from './Sidenav';

const formatNumbers = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

const TopSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const { accessToken } = useAuth();

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
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'>
                        <div className='d-flex flex-row gap-3'>
                            <ul className='list-unstyled d-flex flex-column gap-3 overflow-y-scroll w-50'>
                                <Link to="/subscriptions" className='fw-bold fs-4 text-black text-decoration-none'>Your Top Subscriptions<i class="bi bi-chevron-right ms-2"></i></Link>
                                {subscriptions.map((sub, index) => (
                                    <li key={sub.id} className='d-flex align-items-center gap-3'>
                                        <div style={{ minWidth: '22px' }}>
                                            <p className="text-muted text-end m-0 me-2 d-flex align-items-center justify-content-center">{index + 1}</p>
                                        </div>
                                        <img
                                            src={sub.snippet.thumbnails.default.url}
                                            alt={sub.snippet.title}
                                            className='rounded-circle img-fluid shadow channel-pic'
                                        />
                                        <div>
                                            <p className='m-0 fw-medium'>{sub.snippet.title}</p>
                                            <p className='m-0 text-muted'>{formatNumbers(sub.subscriberCount)} subscribers</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default TopSubscriptions;