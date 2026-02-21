import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { IoAdd, IoPencil, IoTrash, IoClose } from 'react-icons/io5';
import './AdminPanel.css';

export default function AdminPanel() {
    const { products, addProduct, editProduct, deleteProduct } = useProducts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        originalPrice: '',
        category: 'men',
        image: '',
        sizes: ''
    });

    const categories = ['men', 'women', 'kids'];

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                category: product.category,
                image: product.image,
                sizes: product.sizes.join(', ')
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                price: '',
                originalPrice: '',
                category: 'men',
                image: '',
                sizes: ''
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
        const productData = {
            ...formData,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            sizes: formData.sizes.split(',').map(s => s.trim())
        };

        if (editingProduct) {
            editProduct(editingProduct.id, productData);
        } else {
            addProduct(productData);
        }
        handleCloseModal();
    };

    return (
        <div className="admin-panel">
            <div className="panel-header">
                <div>
                    <h3 className="panel-title">Product Inventory</h3>
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
                            <th>Original Price</th>
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
                                <td>₹{product.originalPrice.toLocaleString()}</td>
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="admin-modal">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button className="close-modal" onClick={handleCloseModal}><IoClose /></button>
                        </div>
                        <form className="admin-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
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
                                <div className="form-group">
                                    <label>Sale Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Original Price (₹)</label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Paste Unsplash URL here"
                                        required
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label>Sizes (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.sizes}
                                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                                        placeholder="S, M, L, XL"
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="submit-form-btn">
                                {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
