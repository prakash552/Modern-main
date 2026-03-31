import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            fetchOrders();
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setOrders([]);
        }
    }, [user]);

    const fetchOrders = async () => {
        if (!user) return;
        const token = localStorage.getItem('token');
        try {
            const url = user.role === 'admin' ? '/api/orders' : '/api/orders/myorders';
            const res = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const login = async (email, password) => {
        if (email && password) {
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                const data = await res.json();
                
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    const userData = {
                        id: data.id,
                        email: data.email,
                        name: data.name,
                        role: data.role
                    };
                    setUser(userData);
                    return { success: true, role: userData.role };
                } else {
                    return { success: false, message: data.message || 'Invalid credentials' };
                }
            } catch (error) {
                return { success: false, message: 'Server error' };
            }
        }
        return { success: false, message: 'Invalid credentials' };
    };

    const register = async (name, email, password) => {
        if (name && email && password) {
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                const data = await res.json();
                
                if (res.ok) {
                    localStorage.setItem('token', data.token);
                    const userData = {
                        id: data.id,
                        email: data.email,
                        name: data.name,
                        role: data.role
                    };
                    setUser(userData);
                    return { success: true, role: userData.role };
                } else {
                    return { success: false, message: data.message || 'Registration failed' };
                }
            } catch (error) {
                return { success: false, message: 'Server error' };
            }
        }
        return { success: false, message: 'Please fill all fields' };
    };

    const logout = () => {
        setUser(null);
    };

    const addOrder = async (orderData) => {
        if (!user) return false;
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });
            if (res.ok) {
                const newOrder = await res.json();
                setOrders(prev => [newOrder, ...prev]);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error adding order:', error);
            return false;
        }
    };

    const getUserOrders = () => {
        // Handled by fetchOrders for both admin/user, but we can filter just in case
        if (!user) return [];
        if (user.role === 'admin') return orders;
        return orders.filter(o => o.user === user.id || (o.user && o.user.id === user.id) || o.userId === user.id);
    };

    const updateOrderStatus = async (orderId, status) => {
        // Not implemented in DB currently, but updating locally for UI
        setOrders(prev => prev.map(order => 
            (order.id === orderId || order._id === orderId) ? { ...order, status } : order
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
            orders,
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
