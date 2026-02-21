import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (email, password) => {
        // Mock login - in a real app, this would be an API call
        if (email && password) {
            // Check for admin
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
        // Mock registration
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

    return (
        <AuthContext.Provider value={{ user, isAdmin: user?.role === 'admin', login, register, logout }}>
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
