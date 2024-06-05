// AuthProvider.js
import React, { useState, useContext, useEffect, createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: false, token: null, email: null });
    const [lastActivityTime, setLastActivityTime] = useState(Date.now()); // Initialize to current time upon login

    // Function to handle user login
    const login = (token, email) => {
        setAuthState({ isAuthenticated: true, token, email });
        setLastActivityTime(Date.now()); // Set last activity time upon login
    };

    // Function to handle user logout
    const logout = () => {
        setAuthState({ isAuthenticated: false, token: null, email: null });
    };

    // Automatic logout after 15 minutes of inactivity
    const MAX_IDLE_TIME = 15 * 60 * 1000; // 15 minutes in milliseconds
    useEffect(() => {
        const logoutIfIdle = () => {
            if (authState.isAuthenticated && Date.now() - lastActivityTime > MAX_IDLE_TIME) {
                logout();
            }
        };

        const activityInterval = setInterval(logoutIfIdle, MAX_IDLE_TIME / 2); // Check every half of the idle time

        return () => clearInterval(activityInterval);
    }, [authState.isAuthenticated, lastActivityTime, logout]);

    // Function to update last activity time
    const updateLastActivityTime = () => {
        setLastActivityTime(Date.now());
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout, updateLastActivityTime }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
