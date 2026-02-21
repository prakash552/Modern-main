import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData as initialProductsData } from '../data/data';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        }
        // Flatten initial data
        return [
            ...initialProductsData.men,
            ...initialProductsData.women,
            ...initialProductsData.kids
        ];
    });

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (product) => {
        const newProduct = {
            ...product,
            id: Date.now(),
            rating: 0,
            reviews: 0
        };
        setProducts(prev => [...prev, newProduct]);
        return { success: true };
    };

    const editProduct = (id, updatedProduct) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
        return { success: true };
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id));
        return { success: true };
    };

    const getProductsByCategory = (category) => {
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            editProduct,
            deleteProduct,
            getProductsByCategory
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
