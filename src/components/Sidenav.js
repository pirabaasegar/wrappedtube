import { Link, useLocation } from 'react-router-dom';

const Sidenav = () => {
    const location = useLocation();

    return (
        <aside className="sidenav" id="sidenav">
            <ul className='sidenav-nav p-0 m-0 list-unstyled'>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/overview" className={`nav-link ${location.pathname === '/wrapped' ? 'active' : ''}`}>
                        <i class="bi bi-house-fill"></i><span>Overview</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/subscriptions" className={`nav-link ${location.pathname === '/subscriptions' ? 'active' : ''}`}>
                        <i class="bi bi-people-fill"></i><span>Top Subscriptions</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/videos" className={`nav-link ${location.pathname === '/videos' ? 'active' : ''}`}>
                        <i class="bi bi-play-btn-fill"></i><span>Most-Watched Videos</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/watch-time" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <i class="bi bi-hourglass-split"></i><span>Watch Time</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/activity" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <i class="bi bi-graph-down"></i><span>Activity Trends</span>
                    </Link>
                </li>
                <li className='nav-item p-0 list-unstyled'>
                    <Link to="/share" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <i class="bi bi-share-fill"></i><span>Share Your Wrapped</span>
                    </Link>
                </li>
            </ul>
            <Link to="#" className="d-flex align-items-center text-decoration-none text-black">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png" alt="" width={32} height={32} className="rounded-circle me-2" />
                <span>John Doe</span>
                <i class="bi bi-chevron-down ms-2"></i>
            </Link>
        </aside>
    );
};

export default Sidenav;