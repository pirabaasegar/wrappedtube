import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));

    const saveAccessToken = (token) => {
        setAccessToken(token);
        localStorage.setItem('accessToken', token);
    };

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ accessToken, saveAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);