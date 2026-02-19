import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');

    // Valid coupons mock
    const VALID_COUPONS = {
        'ELEVATE10': 10,
        'WELCOME20': 20,
        'MODERN': 15
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
        setCoupon(null);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const applyCoupon = (code) => {
        const discount = VALID_COUPONS[code.toUpperCase()];
        if (discount) {
            setCoupon({ code: code.toUpperCase(), discount });
            setCouponError('');
            return true;
        } else {
            setCouponError('Invalid coupon code');
            return false;
        }
    };

    const removeCoupon = () => {
        setCoupon(null);
        setCouponError('');
    };

    // Calculations
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = coupon ? (subtotal * coupon.discount) / 100 : 0;
    const serviceCharge = subtotal > 0 ? 99 : 0; // Flat service/shipping fee
    const taxRate = 0.12; // 12% GST
    const taxAmount = (subtotal - discountAmount) * taxRate;
    const finalTotal = subtotal - discountAmount + serviceCharge + taxAmount;
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    // Free shipping progress logic (example: free over 5000)
    const freeShippingThreshold = 5000;
    const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                isCartOpen,
                toggleCart,
                setIsCartOpen,
                cartCount,
                // Advanced fields
                subtotal,
                discountAmount,
                serviceCharge,
                taxAmount,
                finalTotal,
                coupon,
                couponError,
                applyCoupon,
                removeCoupon,
                shippingProgress,
                freeShippingThreshold
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
