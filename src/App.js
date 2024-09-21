import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import StatsPage from './components/StatsPage';
import useGoogleAuth from './hooks/useGoogleAuth';

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useGoogleAuth(setAccessToken);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage accessToken={accessToken} />} />
        <Route path="/stats" element={<StatsPage accessToken={accessToken} />} />
      </Routes>
    </Router>
  );
}

export default App;