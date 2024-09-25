import React, { useEffect, useState } from 'react';
import Sidenav from '../components/Sidenav';
import { Link } from 'react-router-dom';

const Overview = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 5;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column ${currentSlide === 0 ? 'fade-in' : 'd-none'}`} id='slide1'>
                        <h1 className='fw-bold text-danger text-center mb-1'>Ready for your {new Date().getFullYear()} Wrapped?</h1>
                        <p className='text-center text-secondary'>Dive deep into the videos and creators you loved most this year.</p>
                    </div>
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 1 ? 'fade-in' : 'd-none'}`} id='slide2'>
                        <div>
                            <h1 className='fw-bold text-danger text-center mb-2'>Your Top Stats Summary</h1>
                            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>1,000</h1>
                                <p className='text-center text-secondary'>Total Watch Time</p>
                            </div>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>5,500</h1>
                                <p className='text-center text-secondary'>Videos Watched</p>
                            </div>
                            <div>
                                <h1 className='fw-bold text-danger text-center mb-1'>5,500</h1>
                                <p className='text-center text-secondary'>Creators Supported</p>
                            </div>
                        </div>
                    </div>
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 2 ? 'fade-in' : 'd-none'}`} id='slide3'>
                        <div>
                            <h1 className='fw-bold text-danger text-center mb-2'>Your Top 3 Subscribed Channels</h1>
                            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            {Array(3).fill().map((_, index) => (
                                <div key={index}>
                                    <img src='https://yt3.ggpht.com/apfOdRl9Bl80uRCZtj5vLUXGj5VWp0Hu1M09Wuo-VmKtb0kGg0st4Fu1ofWiSQNMe8fLyrQ6mQ=s88-c-k-c0x00ffffff-no-rj' alt={`Video ${index + 1}`} className='rounded-circle img-fluid shadow' width={200} />
                                    <p className='fw-bold m-0 mt-3 text-center'>Arnau Ros</p>
                                    <p className='text-secondary text-center'>66.0K subscribers</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column gap-2 ${currentSlide === 3 ? 'fade-in' : 'd-none'}`} id='slide4'>
                        <div>
                            <h1 className='fw-bold text-danger text-center mb-2'>Your Top 3 Most-Watched Videos</h1>
                            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            {Array(3).fill().map((_, index) => (
                                <div key={index}>
                                    <img src='https://i.ytimg.com/vi/v-94Snw-H4o/default.jpg' alt={`Video ${index + 1}`} className='rounded-1 img-fluid shadow' width={224} />
                                    <p className='fw-bold m-0 mt-3'>Marvel Studios’ Thunderbolts</p>
                                    <p className='text-secondary'>11499.0K views</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={`container h-100 mx-auto py-md-5 px-md-5 d-flex justify-content-center align-items-center flex-column ${currentSlide === 4 ? 'fade-in' : 'd-none'}`} id='slide5'>
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