import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthProvider, useAuth } from './components/AuthContext.js';

import Login from './pages/Login';
import Overview from './pages/Overview';
import TopSubscriptions from './pages/TopSubscriptions';
import MostWatchedVideos from './pages/MostWatchedVideos';
import WatchTime from './pages/WatchTime';
import Activity from './pages/Activity';
import Share from './pages/Share';

const ProtectedRoute = ({ element }) => {
    const { accessToken } = useAuth();
    return accessToken ? element : <Navigate to="/" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/overview" element={<ProtectedRoute element={<Overview />} />} />
                    <Route path="/top-subscriptions" element={<ProtectedRoute element={<TopSubscriptions />} />} />
                    <Route path="/most-watched-videos" element={<ProtectedRoute element={<MostWatchedVideos />} />} />
                    <Route path="/watch-time" element={<ProtectedRoute element={<WatchTime />} />} />
                    <Route path="/activity" element={<ProtectedRoute element={<Activity />} />} />
                    <Route path="/share" element={<ProtectedRoute element={<Share />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;