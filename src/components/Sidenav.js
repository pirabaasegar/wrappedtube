import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../utils/youtube';
import { useAuth } from './AuthContext';

const Sidenav = () => {
    const { accessToken, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);
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

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidenav" id="sidenav">
            <ul className='sidenav-nav p-0 m-0 list-unstyled'>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/overview" className={`nav-link ${location.pathname === '/overview' ? 'active' : ''}`}>
                        <i className="bi bi-house-fill"></i><span>Overview</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/top-subscriptions" className={`nav-link ${location.pathname === '/top-subscriptions' ? 'active' : ''}`}>
                        <i className="bi bi-people-fill"></i><span>Top Subscriptions</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/most-watched-videos" className={`nav-link ${location.pathname === '/most-watched-videos' ? 'active' : ''}`}>
                        <i className="bi bi-youtube"></i><span>Most-Watched Videos</span>
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
            <Link to="#" className="d-flex align-items-center justify-content-between text-decoration-none text-black py-1 px-2 profile-btn">
                <div>
                    <img 
                        src={userImage} 
                        alt='' 
                        width={32} 
                        height={32} 
                        className="rounded-circle me-2" 
                    />
                    <span>{userName}</span>
                </div>
                <div>
                    <Link to='/settings'><i className="bi bi-gear-fill me-3"></i></Link>
                    <button onClick={handleLogout} className="border-0 bg-transparent text-black">
                        <i className="bi bi-box-arrow-right"></i>
                    </button>
                </div>
            </Link>
        </aside>
    );
};

export default Sidenav;