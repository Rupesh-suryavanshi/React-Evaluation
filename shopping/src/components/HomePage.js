// HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?filter=men&page=1&limit=5&sort=price&order=asc');
                setProducts(response.data.data); // Extracting products array from response
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Home Page</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {products.map(product => (
                        <div key={product.id}>
                            <h3>{product.title}</h3>
                            <p>Brand: {product.brand}</p>
                            <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
                            <p>Category: {product.category}</p>
                            <p>Price: {product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomePage;
