import React, { useState } from 'react';
import Sidenav from '../components/Sidenav';

const Share = () => {
    const [isSidenavOpen, setIsSidenavOpen] = useState(true);

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
                    <div className='container d-flex flex-column h-100 mx-auto py-md-5 px-md-5 gap-5'></div>
                </main>
            </div>
        </>
    );
};

export default Share;