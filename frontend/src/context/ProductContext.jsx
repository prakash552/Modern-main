import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            if (res.ok) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (product) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(product)
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(prev => [...prev, data]);
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, message: 'Server error' };
        }
    };

    const editProduct = async (id, updatedProduct) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedProduct)
            });
            const data = await res.json();
            if (res.ok) {
                setProducts(prev => prev.map(p => p.id === id ? data : p));
                return { success: true };
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Error editing product:', error);
            return { success: false, message: 'Server error' };
        }
    };

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
                return { success: true };
            }
            const data = await res.json();
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, message: 'Server error' };
        }
    };

    const getProductsByCategory = (category) => {
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    };

    const updateProductStock = async (id, quantity) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        const newStock = Math.max(0, product.stock - quantity);
        await editProduct(id, { stock: newStock });
    };

    return (
        <ProductContext.Provider value={{
            products,
            loading,
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
