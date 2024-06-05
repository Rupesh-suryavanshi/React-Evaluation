// ProductDetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const toast = useToast();
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching product details');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmAddToCart = () => {
        setIsDialogOpen(false);
        if (product) {
            toast({
                title: 'Item added to cart',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <div>
            <h2>Product Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : product ? (
                <div>
                    <div>
                        <img src={product.image} alt={product.title} style={{ maxWidth: '300px', marginBottom: '10px' }} />
                    </div>
                    <div>
                        <h3>{product.title}</h3>
                        <p>Brand: {product.brand}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: {product.price}</p>
                        <button onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            ) : (
                <p>No product found</p>
            )}

            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={handleCloseDialog}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Add to Cart
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to add this item to cart?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleCloseDialog}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={handleConfirmAddToCart} ml={3}>
                                Confirm
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>
    );
};

export default ProductDetailsPage;
