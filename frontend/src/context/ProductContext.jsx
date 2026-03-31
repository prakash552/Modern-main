import React, { createContext, useContext, useState, useEffect } from 'react';
import { productsData as initialProductsData } from '../data/data';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('products');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        }
        // Flatten initial data and add initial stock, description, and specs
        return [
            ...initialProductsData.men.map(p => ({ 
                ...p, 
                stock: p.stock || 10,
                description: p.description || 'Premium quality product crafted for comfort and style.',
                specifications: p.specifications || { material: 'Cotton', care: 'Machine wash', fit: 'Regular' }
            })),
            ...initialProductsData.women.map(p => ({ 
                ...p, 
                stock: p.stock || 10,
                description: p.description || 'Elegant and comfortable piece for your collection.',
                specifications: p.specifications || { material: 'Silk Blend', care: 'Hand wash', fit: 'Slim' }
            })),
            ...initialProductsData.kids.map(p => ({ 
                ...p, 
                stock: p.stock || 10,
                description: p.description || 'Soft and durable clothing for kids.',
                specifications: p.specifications || { material: 'Organic Cotton', care: 'Machine wash', fit: 'Relaxed' }
            }))
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
            reviews: 0,
            stock: Number(product.stock) || 0
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

    const updateProductStock = (id, quantity) => {
        setProducts(prev => prev.map(p => 
            p.id === id ? { ...p, stock: Math.max(0, p.stock - quantity) } : p
        ));
    };

    return (
        <ProductContext.Provider value={{
            products,
            addProduct,
            editProduct,
            deleteProduct,
            getProductsByCategory,
            updateProductStock
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
