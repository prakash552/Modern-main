import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { IoClose, IoAdd, IoRemove, IoTrashOutline, IoArrowBack } from 'react-icons/io5';
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

    const { user, addOrder } = useAuth();

    const [couponInput, setCouponInput] = useState('');
    const [isCheckoutMode, setIsCheckoutMode] = useState(false);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' or 'cash'
    const [addressDetails, setAddressDetails] = useState({
        fullName: '',
        phone: '',
        street: '',
        city: '',
        zipCode: ''
    });

    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset checkout state when closed
            setTimeout(() => {
                setIsCheckoutMode(false);
                if (isOrderPlaced) {
                    setIsOrderPlaced(false);
                    clearCart();
                    setAddressDetails({ fullName: '', phone: '', street: '', city: '', zipCode: '' });
                }
            }, 400);
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen, isOrderPlaced, clearCart]);

    if (!isCartOpen) return null;

    const handleApplyCoupon = (e) => {
        e.preventDefault();
        if (applyCoupon(couponInput)) {
            setCouponInput('');
        }
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        
        if (!user) {
            alert('Please sign in to place an order.');
            toggleCart();
            return;
        }

        // Validation
        if (!addressDetails.fullName || !addressDetails.phone || !addressDetails.street || !addressDetails.city || !addressDetails.zipCode) {
            alert('Please fill out all address details.');
            return;
        }
        
        const advanceAmount = paymentMethod === 'cash' ? (finalTotal * 0.3) : finalTotal;
        const remainingAmount = paymentMethod === 'cash' ? (finalTotal * 0.7) : 0;
        
        addOrder({
            items: cart,
            totalAmount: finalTotal,
            advancePaid: advanceAmount,
            remainingAmount: remainingAmount,
            paymentMethod: paymentMethod,
            address: addressDetails
        });

        // Show success animation screen
        setIsOrderPlaced(true);
    };

    const handleCloseSuccess = () => {
        setIsOrderPlaced(false);
        clearCart();
        setIsCheckoutMode(false);
        setAddressDetails({ fullName: '', phone: '', street: '', city: '', zipCode: '' });
        toggleCart();
    };

    return (
        <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={toggleCart}>
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                
                {/* Header is hidden in Success Mode for immersive feel */}
                {!isOrderPlaced && (
                    <div className="cart-header">
                        {isCheckoutMode ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button className="back-btn" onClick={() => setIsCheckoutMode(false)}>
                                    <IoArrowBack />
                                </button>
                                <h2>Checkout</h2>
                            </div>
                        ) : (
                            <h2>Your Bag</h2>
                        )}
                        <button className="close-cart" onClick={toggleCart}>
                            <IoClose />
                        </button>
                    </div>
                )}

                <div className="cart-content">
                    {isOrderPlaced ? (
                        <div className="order-success-screen">
                            <div className="success-logo-container">
                                <h1 className="success-logo">ELEVATE</h1>
                            </div>
                            <div className="success-checkmark">
                                <svg viewBox="0 0 130.2 130.2">
                                    <circle className="path circle" fill="none" stroke="#10b981" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                                    <polyline className="path check" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                                </svg>
                            </div>
                            <h2 className="success-title">Order Confirmed!</h2>
                            <p className="success-message">
                                Thank you for shopping with Elevate, {addressDetails.fullName.split(' ')[0]}.
                                <br/><br/>
                                {paymentMethod === 'cash' 
                                    ? `You paid ₹${Math.round(finalTotal * 0.3).toLocaleString()} online. Please keep ₹${Math.round(finalTotal * 0.7).toLocaleString()} ready at the time of delivery to ${addressDetails.city}.` 
                                    : `Your online payment of ₹${Math.round(finalTotal).toLocaleString()} is successful.`}
                            </p>
                            <button className="continue-shopping-btn" onClick={handleCloseSuccess}>
                                Continue Shopping
                            </button>
                        </div>
                    ) : !isCheckoutMode ? (
                        <>
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
                                    cart.map((item) => (
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
                                    ))
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
                        </>
                    ) : (
                        // CHECKOUT FORM
                        <form className="checkout-form" id="checkout-form" onSubmit={handlePlaceOrder}>
                            <div className="checkout-section-title">Delivery Address</div>
                            <div className="checkout-inputs">
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    required 
                                    value={addressDetails.fullName}
                                    onChange={e => setAddressDetails({...addressDetails, fullName: e.target.value})}
                                />
                                <input 
                                    type="tel" 
                                    placeholder="Phone Number" 
                                    required 
                                    value={addressDetails.phone}
                                    onChange={e => setAddressDetails({...addressDetails, phone: e.target.value})}
                                />
                                <input 
                                    type="text" 
                                    placeholder="Street Address" 
                                    required 
                                    value={addressDetails.street}
                                    onChange={e => setAddressDetails({...addressDetails, street: e.target.value})}
                                />
                                <div className="checkout-row">
                                    <input 
                                        type="text" 
                                        placeholder="City" 
                                        required 
                                        value={addressDetails.city}
                                        onChange={e => setAddressDetails({...addressDetails, city: e.target.value})}
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Zip Code" 
                                        required 
                                        value={addressDetails.zipCode}
                                        onChange={e => setAddressDetails({...addressDetails, zipCode: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="checkout-section-title" style={{ marginTop: '2.5rem' }}>Payment Options</div>
                            <div className="payment-options">
                                <label className={`payment-option ${paymentMethod === 'online' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="online" 
                                        checked={paymentMethod === 'online'} 
                                        onChange={() => setPaymentMethod('online')}
                                    />
                                    <div className="option-info">
                                        <span className="option-title">Online Payment (100%)</span>
                                        <span className="option-desc">Pay ₹{Math.round(finalTotal).toLocaleString()} securely right now.</span>
                                    </div>
                                </label>
                                
                                <label className={`payment-option ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                                    <input 
                                        type="radio" 
                                        name="paymentMethod" 
                                        value="cash" 
                                        checked={paymentMethod === 'cash'} 
                                        onChange={() => setPaymentMethod('cash')}
                                    />
                                    <div className="option-info">
                                        <span className="option-title">Cash on Delivery (Advance required)</span>
                                        <span className="option-desc">Pay 30% online (₹{Math.round(finalTotal * 0.3).toLocaleString()}) to confirm order, rest ₹{Math.round(finalTotal * 0.7).toLocaleString()} via cash at delivery.</span>
                                    </div>
                                </label>
                            </div>
                            
                            <div className="checkout-summary">
                                <div className="summary-row">
                                    <span>Total Payable Now:</span>
                                    <strong>₹{Math.round(paymentMethod === 'cash' ? (finalTotal * 0.3) : finalTotal).toLocaleString()}</strong>
                                </div>
                                {paymentMethod === 'cash' && (
                                    <div className="summary-row">
                                        <span>To pay at delivery:</span>
                                        <strong>₹{Math.round(finalTotal * 0.7).toLocaleString()}</strong>
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                </div>

                {!isOrderPlaced && (
                    !isCheckoutMode ? (
                        cart.length > 0 && (
                            <div className="cart-actions">
                                <button className="checkout-btn" onClick={() => setIsCheckoutMode(true)}>
                                    PROCEED TO CHECKOUT
                                </button>
                                <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
                            </div>
                        )
                    ) : (
                        <div className="cart-actions">
                            <button className="checkout-btn pay-btn" type="submit" form="checkout-form">
                                {paymentMethod === 'cash' ? `PAY ₹${Math.round(finalTotal * 0.3).toLocaleString()} & PLACE ORDER` : `PAY ₹${Math.round(finalTotal).toLocaleString()} & PLACE ORDER`}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default Cart;
