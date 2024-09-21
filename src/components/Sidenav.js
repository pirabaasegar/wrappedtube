import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidenav = () => {
    const location = useLocation();

    return (
        <header className="header w-100" id="header">
            <div className="container d-flex justify-content-between">
                <Link to="/" className="navbar-brand">
                    PiRaBaa
                </Link>
                <nav id="navbar" className="navbar order-last p-0" style={{ float: "right" }}>
                    <ul className='m-0 p-0 d-flex list-unstyled align-items-center'>
                        <li>
                            <Link to="/" className={`d-flex align-items-center justify-content-between  ${location.pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/work" className={`d-flex align-items-center justify-content-between  ${location.pathname === '/work' ? 'active' : ''}`}>
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className={`d-flex align-items-center justify-content-between  ${location.pathname === '/blog' ? 'active' : ''}`}>
                                Blog
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Sidenav;