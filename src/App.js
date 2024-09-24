import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './hooks/AuthContext.js';

import Login from './components/Login';
import Overview from './components/Overview';
import TopSubscriptions from './components/TopSubscriptions';
import MostWatchedVideos from './components/MostWatchedVideos';
import WatchTime from './components/WatchTime';
import Activity from './components/Activity';
import Share from './components/Share';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route path="/top-subscriptions" element={<TopSubscriptions />} />
                    <Route path="/most-watched-videos" element={<MostWatchedVideos />} />
                    <Route path="/watch-time" element={<WatchTime />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/share" element={<Share />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;