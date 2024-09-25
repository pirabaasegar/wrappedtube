import React from 'react';
import Sidenav from '../components/Sidenav';

const WatchTime = () => {
    return (
        <>
            <div className='d-flex flex-column-reverse flex-md-row w-100 h-md-100'>
                <Sidenav />
                <main className='w-100 bg-body-tertiary vh-100 overflow-scroll'>
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'></div>
                </main>
            </div>
        </>
    );
};

export default WatchTime;