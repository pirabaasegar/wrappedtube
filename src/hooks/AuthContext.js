import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('userAccessToken'));

    const saveAccessToken = (token) => {
        setAccessToken(token);
        localStorage.setItem('userAccessToken', token);
    };

    useEffect(() => {
        const savedToken = localStorage.getItem('userAccessToken');
        if (savedToken) {
            setAccessToken(savedToken);
        }
    }, []);

    const clearAccessToken = () => {
        setAccessToken(null);
        localStorage.removeItem('userAccessToken');
    };

    return (
        <AuthContext.Provider value={{ accessToken, saveAccessToken, clearAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);