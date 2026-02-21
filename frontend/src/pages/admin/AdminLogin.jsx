import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success && result.role === 'admin') {
            navigate('/admin');
        } else if (result.success) {
            setError('Access Denied: Not an administrator');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <h1>ADMIN PORTAL</h1>
                    <p>Secure access for site administration</p>
                </div>
                <form className="admin-login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            placeholder="admin@elevate.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="admin-error">{error}</p>}
                    <button type="submit" className="admin-submit-btn">SIGN IN TO DASHBOARD</button>
                </form>
                <div className="admin-login-footer">
                    <p>Restricted Area. Unauthorized access is prohibited.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
