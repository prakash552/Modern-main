import React from 'react';
import { useCart } from '../../context/CartContext';
import { IoClose, IoAdd, IoRemove, IoTrashOutline } from 'react-icons/io5';
import './Cart.css';

const Cart = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        removeFromCart,
        updateQuantity,
        clearCart,
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
    } = useCart();

    const [couponInput, setCouponInput] = React.useState('');

    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (applyCoupon(couponInput)) {
            setCouponInput('');
        }
    };

    return (
        <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={toggleCart}>
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Your Bag</h2>
                    <button className="close-cart" onClick={toggleCart}>
                        <IoClose />
                    </button>
                </div>

                <div className="cart-content">
                    {/* Shipping Progress */}
                    {cart.length > 0 && (
                        <div className="shipping-progress-container">
                            <div className="shipping-text">
                                {shippingProgress < 100
                                    ? `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more for FREE shipping`
                                    : "🎉 You've unlocked FREE shipping!"}
                            </div>
                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${shippingProgress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="cart-items">
                        {cart.length === 0 ? (
                            <div className="empty-cart-message">
                                <p>Your bag is empty.</p>
                                <button className="continue-shopping" onClick={toggleCart}>
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => {
                                return (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            <img
                                                src={item.image || 'https://via.placeholder.com/100x120?text=No+Image'}
                                                alt={item.name}
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/100x120?text=Error';
                                                }}
                                            />
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <p className="item-price">₹{item.price.toLocaleString()}</p>
                                            <div className="item-controls-header">Quantity:</div>
                                            <div className="item-controls">
                                                <div className="quantity-toggle">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                        <IoRemove />
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                        <IoAdd />
                                                    </button>
                                                </div>
                                                <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                    <IoTrashOutline />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="cart-summary-section">
                            {/* Coupon Section */}
                            <div className="coupon-section">
                                {coupon ? (
                                    <div className="applied-coupon">
                                        <span>Coupon <strong>{coupon.code}</strong> applied! ({coupon.discount}% OFF)</span>
                                        <button onClick={removeCoupon}>Remove</button>
                                    </div>
                                ) : (
                                    <form className="coupon-form" onSubmit={handleApplyCoupon}>
                                        <input
                                            type="text"
                                            placeholder="Enter Coupon Code"
                                            value={couponInput}
                                            onChange={(e) => setCouponInput(e.target.value)}
                                        />
                                        <button type="submit">Apply</button>
                                    </form>
                                )}
                                {couponError && <p className="coupon-error">{couponError}</p>}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="summary-row discount">
                                        <span>Discount ({coupon.discount}%)</span>
                                        <span>-₹{discountAmount.toLocaleString()}</span>
                                    </div>
                                )}
                                <div className="summary-row">
                                    <span>Service Charge</span>
                                    <span>₹{serviceCharge.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Estimated Tax (12%)</span>
                                    <span>₹{Math.round(taxAmount).toLocaleString()}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>₹{Math.round(finalTotal).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-actions">
                        <button className="checkout-btn">PROCEED TO CHECKOUT</button>
                        <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
