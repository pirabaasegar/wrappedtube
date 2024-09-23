import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import SubsPage from './components/SubsPage';
import VideosPage from './components/VideosPage';
import LoginPage from './components/LoginPage';
import useGoogleAuth from './hooks/useGoogleAuth';

function App() {
    const [accessToken, setAccessToken] = useState(null);

    useGoogleAuth(setAccessToken);

    return (
        <Router>
            <Routes>
                <Route
                    path="/wrapped"
                    element={accessToken ? <MainPage accessToken={accessToken} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/subscriptions"
                    element={accessToken ? <SubsPage accessToken={accessToken} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/videos"
                    element={accessToken ? <VideosPage accessToken={accessToken} /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<LoginPage setAccessToken={setAccessToken} />} />
            </Routes>
        </Router>
    );
}

export default App;