import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoTimeOutline, IoWalletOutline } from 'react-icons/io5';
import './Orders.css';

const Orders = () => {
    const { getUserOrders } = useAuth();
    const orders = getUserOrders();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="orders-page">
            <div className="orders-container">
                <div className="orders-header">
                    <h1>Order History</h1>
                    <p>Review and track your recent purchases</p>
                </div>

                {orders.length === 0 ? (
                    <div className="empty-orders">
                        <div className="empty-icon"><IoWalletOutline /></div>
                        <h2>No orders yet</h2>
                        <p>You haven't placed any orders yet. Discover our premium collections.</p>
                        <Link to="/" className="shop-now-btn">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order, index) => (
                            <div key={order.id} className="order-card" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="order-card-header">
                                    <div className="order-info">
                                        <span className="order-id">Order #{order.id}</span>
                                        <span className="order-date">{formatDate(order.date)}</span>
                                    </div>
                                    <div className={`order-status ${order.status.toLowerCase()}`}>
                                        {order.status === 'Processing' ? <IoTimeOutline /> : <IoCheckmarkCircleOutline />}
                                        {order.status}
                                    </div>
                                </div>
                                
                                <div className="order-body">
                                    <div className="order-items">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item-row">
                                                <img src={item.image} alt={item.name} className="order-item-img" />
                                                <div className="order-item-details">
                                                    <h4>{item.name}</h4>
                                                    <p>Qty: {item.quantity}</p>
                                                </div>
                                                <div className="order-item-price">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="order-summary-box">
                                        <h4>Payment Details</h4>
                                        <div className="payment-row">
                                            <span>Method:</span>
                                            <span>{order.paymentMethod === 'cash' ? 'Cash on Delivery (Advance Paid)' : 'Online Payment'}</span>
                                        </div>
                                        <div className="payment-row">
                                            <span>Total Amount:</span>
                                            <span>₹{Math.round(order.totalAmount).toLocaleString()}</span>
                                        </div>
                                        <div className="payment-row advance">
                                            <span>Paid Online:</span>
                                            <span>₹{Math.round(order.advancePaid).toLocaleString()}</span>
                                        </div>
                                        {order.paymentMethod === 'cash' && (
                                            <div className="payment-row pending">
                                                <span>To pay at delivery:</span>
                                                <span>₹{Math.round(order.remainingAmount).toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="shipping-address">
                                            <h4>Shipping To</h4>
                                            <p>{order.address.fullName}</p>
                                            <p>{order.address.street}, {order.address.city} - {order.address.zipCode}</p>
                                            <p>Phone: {order.address.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
