import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubscriptions, getMostWatchedVideos } from '../api/youtube';
import Sidenav from './Sidenav';

const formatNumbers = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

const Overview = ({ accessToken }) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [topVideos, setTopVideos] = useState([]);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (accessToken) {
                const data = await getSubscriptions(accessToken);
                setSubscriptions(data);
            }
        };

        const fetchVideos = async () => {
            if (accessToken) {
                const videos = await getMostWatchedVideos(accessToken);
                setTopVideos(videos);
            }
        };

        fetchSubscriptions();
        fetchVideos();
    }, [accessToken]);

    return (
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'>
                        <div className='hero w-100 h-50 p-4 d-flex text-white flex-column-reverse shadow rounded-4' style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                            <div className='w-100 mx-md-auto'>
                                <h1 className='fw-bold text-5'>Welcome to Your Year on YouTube!</h1>
                            </div>
                        </div>
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
                            <ul className='list-unstyled d-flex flex-column gap-3 overflow-y-scroll w-50'>
                                <Link to="/videos" className='fw-bold fs-4 text-black text-decoration-none'>Your Most Watched Videos<i class="bi bi-chevron-right ms-2"></i></Link>
                                {topVideos.map((video, index) => (
                                    <li key={video.id} className='d-flex align-items-center gap-3'>
                                        <div style={{ minWidth: '22px' }}>
                                            <p className="text-muted text-end m-0 me-2 d-flex align-items-center justify-content-center">{index + 1}</p>
                                        </div>
                                        <img
                                            src={video.snippet.thumbnails.default.url} 
                                            alt={video.snippet.title}
                                            className='rounded-1 img-fluid shadow channel-pic'
                                        />
                                        <div>
                                            <p className='m-0 fw-medium'>{video.snippet.title}</p>
                                            <p className='m-0 text-muted'>{formatNumbers(video.statistics.viewCount)} views</p>
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

export default Overview;