import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMostWatchedVideos } from '../utils/youtube';
import { useAuth } from '../components/AuthContext';
import Sidenav from '../components/Sidenav';

const formatNumbers = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

const MostWatchedVideos = () => {
    const [topVideos, setTopVideos] = useState([]);
    const { accessToken } = useAuth();

    useEffect(() => {
        const fetchVideos = async () => {
            if (accessToken) {
                const videos = await getMostWatchedVideos(accessToken);
                setTopVideos(videos);
            }
        };

        fetchVideos();
    }, [accessToken]);

    return (
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'>
                        <div className='d-flex flex-row gap-3'>
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

export default MostWatchedVideos;