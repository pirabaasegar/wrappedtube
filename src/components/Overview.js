import React from 'react';
import Sidenav from './Sidenav';
import { Link } from 'react-router-dom';

const Overview = () => {
    return (
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className='container h-100 mx-auto py-md-5 px-md-5 2 d-flex justify-content-center align-items-center flex-column d-none' id='slide1'>
                        <h1 className='fw-bold text-danger text-center mb-1'>Ready for your {new Date().getFullYear()} Wrapped?</h1>
                        <p className='text-center text-secondary'>Dive deep into the videos and creators you loved most this year.</p>
                    </div>
                    <div className='container h-100 mx-auto py-md-5 px-md-5 2 d-flex justify-content-center align-items-center flex-column gap-2 d-none' id='slide2'>
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
                    <div className='container h-100 mx-auto py-md-5 px-md-5 2 d-flex justify-content-center align-items-center flex-column gap-2 d-none' id='slide3'>
                        <div>
                            <h1 className='fw-bold text-danger text-center mb-2'>Your Top 3 Most-Watched Videos</h1>
                            <p className='text-center text-secondary'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row gap-5'>
                            <div>
                                <img src='https://i.ytimg.com/vi/v-94Snw-H4o/default.jpg' alt='{video.snippet.title}' className='rounded-1 img-fluid shadow' width={224} />
                                <p className='fw-bold m-0 mt-3'>Marvel Studios’ Thunderbolts*</p>
                                <p className='text-secondary'>11499.0K views</p>
                            </div>
                            <div>
                                <img src='https://i.ytimg.com/vi/v-94Snw-H4o/default.jpg' alt='{video.snippet.title}' className='rounded-1 img-fluid shadow' width={224} />
                                <p className='fw-bold m-0 mt-3'>Marvel Studios’ Thunderbolts*</p>
                                <p className='text-secondary'>11499.0K views</p>
                            </div>
                            <div>
                                <img src='https://i.ytimg.com/vi/v-94Snw-H4o/default.jpg' alt='{video.snippet.title}' className='rounded-1 img-fluid shadow' width={224} />
                                <p className='fw-bold m-0 mt-3'>Marvel Studios’ Thunderbolts*</p>
                                <p className='text-secondary'>11499.0K views</p>
                            </div>
                        </div>
                    </div>
                    <div className='container h-100 mx-auto py-md-5 px-md-5 2 d-flex justify-content-center align-items-center flex-column' id='slide4'>
                        <h1 className='fw-bold text-danger text-center mb-1'>Explore Your Wrapped More...</h1>
                        <p className='text-center text-secondary'>Dive deep into the videos and creators you loved most this year.</p>
                        <Link to="/top-subscriptions" className='rounded-5 pe-auto border-0 px-3 py-2 text-white bg-danger text-decoration-none'>Click Here</Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Overview;