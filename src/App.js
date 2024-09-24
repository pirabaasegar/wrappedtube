import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Overview from './components/Overview';
import TopSubscriptions from './components/TopSubscriptions';
import MostWatchedVideos from './components/MostWatchedVideos';
import WatchTime from './components/WatchTime';
import Activity from './components/Activity';
import Share from './components/Share';

import useGoogleAuth from './hooks/useGoogleAuth';

function App() {
    const [accessToken, setAccessToken] = useState(null);

    useGoogleAuth(setAccessToken);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login setAccessToken={setAccessToken} accessToken={accessToken} />} />
                <Route path="/overview" element={accessToken ? <Overview accessToken={accessToken} /> : <Navigate to="/" />} />
                <Route path="/top-subscriptions" element={accessToken ? <TopSubscriptions accessToken={accessToken} /> : <Navigate to="/" />} />
                <Route path="/most-watched-videos" element={accessToken ? <MostWatchedVideos accessToken={accessToken} /> : <Navigate to="/" />} />
                <Route path="/watch-time" element={accessToken ? <WatchTime accessToken={accessToken} /> : <Navigate to="/" />} />
                <Route path="/activity" element={accessToken ? <Activity accessToken={accessToken} /> : <Navigate to="/" />} />
                <Route path="/share" element={accessToken ? <Share accessToken={accessToken} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;