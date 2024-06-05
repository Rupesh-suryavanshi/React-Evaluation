// ProductCard.js
import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <h3>{product.title}</h3>
            <p>Brand: {product.brand}</p>
            <img src={product.image} alt={product.title} style={{ maxWidth: '200px' }} />
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
        </div>
    );
};

export default ProductCard;
