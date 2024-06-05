import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
    const { authState, logout } = useAuth();

    return (
        <nav>
            <ul>
                {authState.isAuthenticated ? (
                    <>
                        <li>Welcome, {authState.email}</li>
                        <li><Link to="/">Home</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Login</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
