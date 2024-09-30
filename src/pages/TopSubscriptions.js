import React, { useState, useEffect } from 'react';
import { getSubscriptions } from '../utils/youtube';
import { useAuth } from '../components/AuthContext';
import Sidenav from '../components/Sidenav';

const formatNumbers = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

const TopSubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [isSidenavOpen, setIsSidenavOpen] = useState(true); 
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

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    return (
        <>
            <div className={`d-flex flex-md-row w-100 h-md-100 ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'}`}>
            <Sidenav isOpen={isSidenavOpen} />
            <main className={`w-100 bg-body-tertiary vh-100 overflow-scroll ${isSidenavOpen ? 'shrink-main' : 'expand-main'}`}>
                    <button onClick={toggleSidenav} className="border-0 bg-transparent text-black position-fixed sidenav-btn">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'>
                        <div className='d-flex flex-row gap-3'>
                            <ul className='list-unstyled d-flex flex-column gap-3 overflow-y-scroll w-100 flex-wrap h-50'>
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