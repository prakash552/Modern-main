import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { IoAdd, IoPencil, IoTrash, IoClose, IoGridOutline, IoBagCheckOutline, IoListOutline, IoWalletOutline, IoCubeOutline, IoTrendingUpOutline } from 'react-icons/io5';
import './AdminPanel.css';

export default function AdminPanel() {
    const { products, addProduct, editProduct, deleteProduct } = useProducts();
    const { orders, updateOrderStatus } = useAuth();
    
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        category: 'men',
        image: '',
        sizes: '',
        stock: '',
        description: '',
        specifications: ''
    });

    const categories = ['men', 'women', 'kids'];

    // Stats calculations
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
    const totalOrders = orders.length;
    const activeProducts = products.length;

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                category: product.category,
                image: product.image,
                sizes: (product.sizes || []).join(', '),
                stock: product.stock || 0,
                description: product.description || '',
                specifications: product.specifications ? Object.entries(product.specifications).map(([k, v]) => `${k}: ${v}`).join('\n') : ''
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                price: '',
                originalPrice: '',
                category: 'men',
                image: '',
                sizes: '',
                stock: '',
                description: '',
                specifications: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const specsObj = {};
        formData.specifications.split('\n').forEach(line => {
            const [key, value] = line.split(':').map(s => s.trim());
            if (key && value) specsObj[key] = value;
        });

        const productData = {
            ...formData,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            stock: Number(formData.stock),
            sizes: formData.sizes.split(',').map(s => s.trim()),
            specifications: specsObj
        };

        if (editingProduct) {
            editProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        handleCloseModal();
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const renderDashboard = () => (
        <div className="dashboard-view animate-fade">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><IoWalletOutline /></div>
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p className="stat-value">₹{Math.round(totalRevenue).toLocaleString()}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><IoBagCheckOutline /></div>
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p className="stat-value">{totalOrders}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><IoCubeOutline /></div>
                    <div className="stat-info">
                        <h3>Active Products</h3>
                        <p className="stat-value">{activeProducts}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><IoTrendingUpOutline /></div>
                    <div className="stat-info">
                        <h3>Success Rate</h3>
                        <p className="stat-value">98.5%</p>
                    </div>
                </div>
            </div>

            <div className="recent-orders-compact">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                    {orders.slice(0, 5).map(order => (
                        <div key={order.id} className="activity-item">
                            <div className="activity-bullet"></div>
                            <div className="activity-content">
                                <p>Order <strong>#{order.id}</strong> was placed by {order.address?.fullName || 'Guest'}</p>
                                <span className="activity-time">{new Date(order.date).toLocaleDateString()}</span>
                            </div>
                            <span className={`status-pill ${order.status?.toLowerCase()}`}>{order.status}</span>
                        </div>
                    ))}
                    {orders.length === 0 && <p className="no-data">No recent orders found.</p>}
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="inventory-view animate-fade">
            <div className="panel-header">
                <div>
                    <h3 className="panel-title-inline">Product Inventory</h3>
                    <p className="panel-desc">Manage your products across all categories.</p>
                </div>
                <button className="add-product-btn" onClick={() => handleOpenModal()}>
                    <IoAdd /> Add New Product
                </button>
            </div>

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt={product.name} className="table-img" />
                                </td>
                                <td>{product.name}</td>
                                <td><span className={`category-badge ${product.category}`}>{product.category}</span></td>
                                <td>₹{product.price.toLocaleString()}</td>
                                <td>
                                    <span className={`stock-badge ${product.stock <= 5 ? 'low' : ''}`}>
                                        {product.stock} units
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btns">
                                        <button className="edit-btn" onClick={() => handleOpenModal(product)} title="Edit"><IoPencil /></button>
                                        <button className="delete-btn" onClick={() => deleteProduct(product.id)} title="Delete"><IoTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="orders-view animate-fade">
             <div className="panel-header">
                <div>
                    <h3 className="panel-title-inline">Order Management</h3>
                    <p className="panel-desc">View and manage all customer orders.</p>
                </div>
            </div>

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="order-id-cell">#{order.id}</td>
                                <td>
                                    <div className="customer-info">
                                        <p>{order.address?.fullName}</p>
                                        <span>{order.address?.phone}</span>
                                    </div>
                                </td>
                                <td>₹{order.totalAmount.toLocaleString()}</td>
                                <td>
                                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="status-select"
                                        value={order.status}
                                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div className="empty-state">No orders received yet.</div>}
            </div>
        </div>
    );

    return (
        <div className="admin-panel">
            <div className="admin-sidebar-nav">
                <button 
                    className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('dashboard')}
                >
                    <IoGridOutline /> Dashboard
                </button>
                <button 
                    className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('orders')}
                >
                    <IoBagCheckOutline /> Orders {totalOrders > 0 && <span className="badge-count-pill">{totalOrders}</span>}
                </button>
                <button 
                    className={`nav-item ${activeTab === 'products' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('products')}
                >
                    <IoListOutline /> Inventory
                </button>
            </div>

            <div className="admin-content-area">
                {activeTab === 'dashboard' && renderDashboard()}
                {activeTab === 'products' && renderProducts()}
                {activeTab === 'orders' && renderOrders()}
            </div>

            {isModalOpen && (
                <div className="full-screen-edit-overlay animate-fade">
                    <div className="edit-container-inner">
                        <div className="edit-header-sticky">
                            <div className="header-left">
                                <button className="close-edit-btn" onClick={handleCloseModal}><IoClose /></button>
                                <div>
                                    <h2 className="edit-title">{editingProduct ? 'Update Product Details' : 'Create New Product'}</h2>
                                    <p className="edit-subtitle">{editingProduct ? `Refining ${editingProduct.name}` : 'Fill in the information to list a new item.'}</p>
                                </div>
                            </div>
                            <div className="header-right">
                                <button className="save-changes-btn" type="submit" form="full-product-form">
                                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                                </button>
                            </div>
                        </div>

                        <div className="edit-content-scroll">
                            <form className="full-product-form" id="full-product-form" onSubmit={handleSubmit}>
                                <div className="edit-form-grid">
                                    {/* Left Side: General & Pricing */}
                                    <div className="edit-form-col">
                                        <div className="edit-form-section">
                                            <h3 className="section-title">General Information</h3>
                                            <div className="section-card">
                                                <div className="form-group">
                                                    <label>Product Name</label>
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        placeholder="Enter product title..."
                                                        required
                                                    />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group flex-1">
                                                        <label>Category</label>
                                                        <select
                                                            value={formData.category}
                                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                        >
                                                            {categories.map(cat => (
                                                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-group flex-2">
                                                        <label>Available Sizes (comma separated)</label>
                                                        <input
                                                            type="text"
                                                            value={formData.sizes}
                                                            onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                                            placeholder="S, M, L, XL..."
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="edit-form-section">
                                            <h3 className="section-title">Pricing & Inventory</h3>
                                            <div className="section-card">
                                                <div className="form-row">
                                                    <div className="form-group flex-1">
                                                        <label>Sale Price (₹)</label>
                                                        <input
                                                            type="number"
                                                            value={formData.price}
                                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                            placeholder="0"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group flex-1">
                                                        <label>Original Price (₹)</label>
                                                        <input
                                                            type="number"
                                                            value={formData.originalPrice}
                                                            onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                                            placeholder="0"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group flex-1">
                                                        <label>Current Stock</label>
                                                        <input
                                                            type="number"
                                                            value={formData.stock}
                                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                            placeholder="0"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side: Media & Descriptions */}
                                    <div className="edit-form-col">
                                        <div className="edit-form-section">
                                            <h3 className="section-title">Visuals & Branding</h3>
                                            <div className="section-card">
                                                <div className="form-group">
                                                    <label>Upload Product Image</label>
                                                    <div className="file-upload-wrapper">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            id="image-upload-input"
                                                            hidden
                                                        />
                                                        <label htmlFor="image-upload-input" className="file-upload-trigger">
                                                            <IoAdd /> Choose File
                                                        </label>
                                                        {formData.image && <span className="file-status">Image selected</span>}
                                                    </div>
                                                </div>
                                                <div className="form-divider"><span>OR</span></div>
                                                <div className="form-group">
                                                    <label>Product Image URL</label>
                                                    <input
                                                        type="url"
                                                        value={formData.image.startsWith('data:') ? '' : formData.image}
                                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                        placeholder="Paste image link here..."
                                                    />
                                                </div>
                                                {formData.image && (
                                                    <div className="edit-image-preview">
                                                        <img src={formData.image} alt="Preview" />
                                                        <button 
                                                            className="remove-img-btn" 
                                                            onClick={() => setFormData({ ...formData, image: '' })}
                                                            title="Remove image"
                                                        >
                                                            <IoClose />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="edit-form-section">
                                            <h3 className="section-title">Content & Specs</h3>
                                            <div className="section-card">
                                                <div className="form-group">
                                                    <label>Full Product Description</label>
                                                    <textarea
                                                        value={formData.description}
                                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                        placeholder="Describe the styling, comfort, and occasion..."
                                                        rows="5"
                                                        required
                                                    ></textarea>
                                                </div>
                                                <div className="form-group">
                                                    <label>Key Specifications (one per line)</label>
                                                    <textarea
                                                        value={formData.specifications}
                                                        onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                                        placeholder="Material: Cotton&#10;Care: Hand Wash"
                                                        rows="4"
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
