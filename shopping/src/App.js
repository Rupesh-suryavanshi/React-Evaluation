// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import { AuthProvider } from './AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import ProductDetailsPage from './components/ProductDetailsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes> {/* Wrap routes with <Routes> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
