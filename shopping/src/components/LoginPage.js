// LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login', {
                email,
                password
            });
            const { token } = response.data;
            login(email, token);
            // Redirect to Home Page programmatically
            window.location.href = '/'; 
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Login</h2>
                <div style={{ marginBottom: '10px' }}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required autoFocus />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Login</button>
                {error && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
