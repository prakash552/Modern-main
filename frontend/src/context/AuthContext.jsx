import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('orders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem('orders', JSON.stringify(orders));
    }, [orders]);

    const login = (email, password) => {
        if (email && password) {
            const isAdmin = email === 'admin@elevate.com' && password === 'admin123';
            const userData = {
                email,
                name: email.split('@')[0],
                id: Date.now(),
                role: isAdmin ? 'admin' : 'user'
            };
            setUser(userData);
            return { success: true, role: userData.role };
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = (name, email, password) => {
        if (name && email && password) {
            const userData = { name, email, id: Date.now(), role: 'user' };
            setUser(userData);
            return { success: true, role: userData.role };
        }
        return { success: false, message: 'Please fill all fields' };
    };

    const logout = () => {
        setUser(null);
    };

    const addOrder = (orderData) => {
        if (!user) return false;
        const newOrder = {
            ...orderData,
            id: 'ORD' + Date.now().toString().slice(-4),
            userId: user.id,
            date: new Date().toISOString(),
            status: 'Processing'
        };
        setOrders(prev => [newOrder, ...prev]);
        return true;
    };

    const getUserOrders = () => {
        if (!user) return [];
        return orders.filter(o => o.userId === user.id);
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(order => 
            order.id === orderId ? { ...order, status } : order
        ));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAdmin: user?.role === 'admin', 
            login, 
            register, 
            logout, 
            addOrder, 
            getUserOrders,
            orders, // Exposing all orders for admin
            updateOrderStatus
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
