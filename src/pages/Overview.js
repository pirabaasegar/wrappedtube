import React, { useEffect, useState } from 'react';
import Sidenav from '../components/Sidenav';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { getSubscriptions, getMostWatchedVideos, getWatchTime } from '../utils/youtube';

const formatNumbers = (count) => {
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
};

const Overview = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSidenavOpen, setIsSidenavOpen] = useState(true);
    const totalSlides = 5;

    const [subscriptions, setSubscriptions] = useState([]);
    const [watchTime, setWatchTime] = useState(0);
    const [topVideos, setTopVideos] = useState([]);
    const { accessToken } = useAuth();

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

        const fetchWatchTime = async () => {
            if (accessToken) {
                const videos = await getMostWatchedVideos(accessToken);
                const totalWatchTime = await getWatchTime(videos);
                setWatchTime(totalWatchTime);
            }
        };

        fetchSubscriptions();
        fetchWatchTime();
        fetchVideos();

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
        }, 5000);

        return () => clearInterval(interval);
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

                    {/* Slide 1 */}
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column ${currentSlide === 0 ? 'fade-in' : 'd-none'}`}>
                        <h1 className='fw-bold text-danger text-center mb-1'>Ready for your {new Date().getFullYear()} Wrapped?</h1>
                        <p className='text-center text-secondary'>Dive deep into the videos and creators you loved most this year.</p>
                    </div>

                    {/* Slide 2: Watch Time and Stats */}
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 1 ? 'fade-in' : 'd-none'}`}>
                        <h1 className='fw-bold text-danger text-center mb-2'>Your Top Stats Summary</h1>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>{watchTime.toFixed(1)} hrs</h1>
                                <p className='text-center text-secondary'>Total Watch Time</p>
                            </div>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>{topVideos.length}</h1>
                                <p className='text-center text-secondary'>Videos Watched</p>
                            </div>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>{subscriptions.length}</h1>
                                <p className='text-center text-secondary'>Creators Supported</p>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Top 3 Subscribed Channels */}
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 2 ? 'fade-in' : 'd-none'}`}>
                        <h1 className='fw-bold text-danger text-center mb-2'>Your Top 3 Subscribed Channels</h1>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            {subscriptions.slice(0, 3).map((sub, index) => (
                                <div key={index}>
                                    <img src={sub.snippet.thumbnails.default.url} alt={sub.snippet.title} className='rounded-circle img-fluid shadow' width={200} />
                                    <p className='fw-bold m-0 mt-3 text-center'>{sub.snippet.title}</p>
                                    <p className='text-secondary text-center'>{formatNumbers(sub.subscriberCount)} subscribers</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slide 4: Top 3 Most-Watched Videos */}
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 3 ? 'fade-in' : 'd-none'}`}>
                        <h1 className='fw-bold text-danger text-center mb-2'>Your Top 3 Most-Watched Videos</h1>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            {topVideos.slice(0, 3).map((video, index) => (
                                <div key={index}>
                                    <img src={video.snippet.thumbnails.default?.url} alt={video.snippet.title} className='rounded-1 img-fluid shadow' width={224} />
                                    <p className='fw-bold m-0 mt-3'>{video.snippet.title}</p>
                                    <p className='text-secondary'>{formatNumbers(video.viewCount)} views</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Slide 5 */}
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column ${currentSlide === 4 ? 'fade-in' : 'd-none'}`}>
                        <h1 className='fw-bold text-danger text-center mb-1'>Explore Your Wrapped More...</h1>
                        <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        <Link to="/share" className='rounded-2 pe-auto border-0 px-3 py-2 text-white bg-danger text-decoration-none shadow-btn d-flex justify-content-center align-items-center'>
                            <i className="bi bi-youtube me-2 fs-6"></i>Share Your Wrapped
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Overview;