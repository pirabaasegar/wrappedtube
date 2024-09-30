import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import { useAuth } from '../components/AuthContext';
import { getMostWatchedVideos, getWatchTime } from '../utils/youtube';

const WatchTime = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(true);
    const [watchTime, setWatchTime] = useState(0);
    const { accessToken } = useAuth();

    const toggleSidenav = () => {
        setIsSidenavOpen(!isSidenavOpen);
    };

    useEffect(() => {
        const fetchWatchTime = async () => {
            try {
                const videos = await getMostWatchedVideos(accessToken);
                const totalWatchTime = await getWatchTime(videos);
                setWatchTime(totalWatchTime);
            } catch (error) {
                console.error('Error fetching watch time:', error);
            }
        };
            
        fetchWatchTime();
    }, [accessToken]);

    return (
        <>
            <div className={`d-flex flex-md-row w-100 h-md-100 ${isSidenavOpen ? 'sidenav-open' : 'sidenav-closed'}`}>
                <Sidenav isOpen={isSidenavOpen} />
                <main className={`w-100 bg-body-tertiary vh-100 overflow-scroll ${isSidenavOpen ? 'shrink-main' : 'expand-main'}`}>
                    <button onClick={toggleSidenav} className="border-0 bg-transparent text-black position-fixed sidenav-btn">
                        <i className="bi bi-list"></i>
                    </button>
                    <div className='container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2'>
                        <div>
                            <h1 className='fw-bold text-danger text-center mb-1'>Your Total Watch Time</h1>
                            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <h1 className='fw-bold text-danger text-center mb-0'>{watchTime.toFixed(1)} hrs</h1>
                            <p className='text-center text-secondary'>Total Watch Time</p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default WatchTime;