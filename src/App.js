import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import StatsPage from './components/StatsPage';
import LoginPage from './components/LoginPage';
import useGoogleAuth from './hooks/useGoogleAuth';

function App() {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        // Check localStorage for existing access token
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setAccessToken(storedToken);
        }
    }, []);

    useGoogleAuth((token) => {
        if (token) {
            localStorage.setItem('accessToken', token);
            setAccessToken(token);
        }
    });

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={accessToken ? <MainPage accessToken={accessToken} /> : <Navigate to="/login" />}
                />
                <Route
                    path="/stats"
                    element={accessToken ? <StatsPage accessToken={accessToken} /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<LoginPage setAccessToken={setAccessToken} />} />
            </Routes>
        </Router>
    );
}

export default App;