import { Link, useLocation } from 'react-router-dom';

const Sidenav = () => {
    const location = useLocation();

    return (
        <aside className="sidenav vh-100 bg-white z-3 align-self-stretch" id="sidenav">
            <div className='d-flex flex-row flex-md-column'>
                <Link to="/" className={`d-flex flex-grow-1 align-items-center justify-content-center p-4 mx-3 ${location.pathname === '/' ? 'text-body-secondary' : 'text-body-tertiary'}`}>
                    <i class="bi bi-house-fill fs-2"></i>
                </Link>
                <Link to="/subscriptions" className={`d-flex flex-grow-1 align-items-center justify-content-center p-4 mx-3 ${location.pathname === '/subscriptions' ? 'text-body-secondary' : 'text-body-tertiary'}`}>
                    <i class="bi bi-people-fill fs-2"></i>
                </Link>
                <Link to="/videos" className={`d-flex flex-grow-1 align-items-center justify-content-center p-4 mx-3 ${location.pathname === '/videos' ? 'text-body-secondary' : 'text-body-tertiary'}`}>
                    <i class="bi bi-play-btn-fill fs-2"></i>
                </Link>
                <Link to="/login" className={`d-flex flex-grow-1 align-items-center justify-content-center p-4 mx-3 text-body-tertiary`}>
                    <i class="bi bi-person-circle fs-2"></i>
                </Link>
            </div>
        </aside>
    );
};

export default Sidenav;