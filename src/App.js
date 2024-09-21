import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import StatsPage from './components/StatsPage';
import LoginPage from './components/LoginPage';
import useGoogleAuth from './hooks/useGoogleAuth';

function App() {
    const [accessToken, setAccessToken] = useState(null);
  
    // Initialize Google Auth
    useGoogleAuth(setAccessToken);
  
    useEffect(() => {
      // On initial load, check if token is stored
      const token = localStorage.getItem('accessToken');
      if (token) {
        setAccessToken(token);
      }
    }, []);

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