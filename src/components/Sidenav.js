import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserProfile } from '../api/youtube';

const Sidenav = ({ accessToken }) => {
    const location = useLocation();
    const [userName, setUserName] = useState('John Doe');
    const [userImage, setUserImage] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            if (accessToken) {
                try {
                    const profile = await getUserProfile(accessToken);
                    setUserName(profile.userName);
                    setUserImage(profile.userImage);
                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                }
            }
        };

        fetchProfile();
    }, [accessToken]);

    return (
        <aside className="sidenav" id="sidenav">
            <ul className='sidenav-nav p-0 m-0 list-unstyled'>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/overview" className={`nav-link ${location.pathname === '/wrapped' ? 'active' : ''}`}>
                        <i className="bi bi-house-fill"></i><span>Overview</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/top-subscriptions" className={`nav-link ${location.pathname === '/subscriptions' ? 'active' : ''}`}>
                        <i className="bi bi-people-fill"></i><span>Top Subscriptions</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/most-watched-videos" className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`}>
                        <i className="bi bi-play-btn-fill"></i><span>Most-Watched Videos</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/watch-time" className={`nav-link ${location.pathname === '/watch-time' ? 'active' : ''}`}>
                        <i className="bi bi-hourglass-split"></i><span>Watch Time</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/activity" className={`nav-link ${location.pathname === '/activity' ? 'active' : ''}`}>
                        <i className="bi bi-graph-down"></i><span>Activity Trends</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/share" className={`nav-link ${location.pathname === '/share' ? 'active' : ''}`}>
                        <i className="bi bi-share-fill"></i><span>Share Your Wrapped</span>
                    </Link>
                </li>
            </ul>
            <Link to="#" className="d-flex align-items-center text-decoration-none text-black py-1 px-2">
                <img 
                    src={userImage || "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"} 
                    alt={`${userName}'s profile`} 
                    width={32} 
                    height={32} 
                    className="rounded-circle me-2" 
                />
                <span>{userName}</span>
                <i className="bi bi-chevron-down ms-2"></i>
            </Link>
        </aside>
    );
};

export default Sidenav;