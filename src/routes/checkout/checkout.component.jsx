// we need to imoprt this bcz you need to display the items the user chose in the cart
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context.jsx';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { clearCart } from '../../store/cart/cart.reducer';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// import PaymentForm from '../../components/payment-form/payment-form.component';
import './checkout.styles.scss';

const Checkout = () => {
  // destrucutre the cart context
  // const {cartItems,cartTotal}=useContext(CartContext);
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // ===============================
  // Shipping Address Form State
  // ✅ optional for now — will be required when delivery is implemented
  // ===============================
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    phone: '',
  });

  const [notes, setNotes] = useState('');

  // ===============================
  // Handle Place Order
  // ===============================
  const handlePlaceOrder = async () => {
    // ✅ check if user is logged in
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    // ✅ check if cart is empty
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('customerToken');

      // ✅ build order items from cart
      const orderItems = cartItems.map(item => ({
        product: item._id,
        title: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedColor: item.selectedColor || null,
        selectedSize: item.selectedSize || null,
      }));

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          orderItems,
          totalPrice: cartTotal,
          // ✅ only send shippingAddress if fullName is filled
          shippingAddress: shippingAddress.fullName ? shippingAddress : null,
          notes: notes || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // ✅ clear cart after successful order
      dispatch(clearCart());
      setOrderSuccess(true);

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // Order Success Screen
  // ===============================
  if (orderSuccess) {
    return (
      <div className='checkout'>
        <div className='checkout__success'>
          <h2>✅ Order Placed Successfully!</h2>
          <p>Thank you for your order. We will process it shortly.</p>
          <button
            className='checkout__success-btn'
            onClick={() => navigate('/shop')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='checkout'>

      {/* ===============================
          Checkout Header
      =============================== */}
      <div className='checkout__header'>
        <div className='checkout__header-block'>
          <span>Product</span>
        </div>

        <div className='checkout__header-block'>
          <span>Description</span>
        </div>

        <div className='checkout__header-block'>
          <span>Quantity</span>
        </div>

        <div className='checkout__header-block'>
          <span>Price</span>
        </div>

        <div className='checkout__header-block checkout__header-block--remove'>
          <span>Remove</span>
        </div>
      </div>

      {/* ===============================
          Cart Items
      =============================== */}
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <span className='checkout__total'>
        Total: ${cartTotal}
      </span>

      {/* ===============================
          Shipping Address Form
          ✅ optional for now — will be required when delivery is implemented
      =============================== */}
      <div className='checkout__shipping'>
        <h2 className='checkout__shipping-title'>
          Shipping Address
          <span className='checkout__shipping-optional'> (Optional)</span>
        </h2>

        <div className='checkout__shipping-field'>
          <input
            type='text'
            placeholder='Full Name'
            value={shippingAddress.fullName}
            onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
          />
        </div>

        <div className='checkout__shipping-field'>
          <input
            type='text'
            placeholder='Address'
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
          />
        </div>

        <div className='checkout__shipping-row'>
          <div className='checkout__shipping-field'>
            <input
              type='text'
              placeholder='City'
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
            />
          </div>

          <div className='checkout__shipping-field'>
            <input
              type='text'
              placeholder='Country'
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
            />
          </div>
        </div>

        <div className='checkout__shipping-field'>
          <input
            type='text'
            placeholder='Phone Number'
            value={shippingAddress.phone}
            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
          />
        </div>

        {/* ✅ optional order notes */}
        <div className='checkout__shipping-field'>
          <textarea
            placeholder='Order notes (optional)'
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* ✅ show error if any */}
      {error && <p className='checkout__error checkout__error--main'>{error}</p>}

      {/* ===============================
          Place Order Button
      =============================== */}
      <button
        className='checkout__place-order-btn'
        onClick={handlePlaceOrder}
        disabled={isLoading || cartItems.length === 0}
      >
        {isLoading ? 'Placing Order...' : `Place Order — $${cartTotal}`}
      </button>

    </div>
  );
};

export default Checkout;

//before using ts
//we need to imoprt this bcz you need to display the items the user chose in the cart
//import { useContext } from 'react';
//import { CartContext } from '../../contexts/cart.context.jsx';
// import { useSelector } from 'react-redux';
// import { selectCartItems,selectCartTotal } from '../../store/cart/cart.selector';
// import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// import PaymentForm from '../../components/payment-form/payment-form.component';
// import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

// const Checkout=()=>{
//     //destrucutre the cart context
//     //const {cartItems,cartTotal}=useContext(CartContext);
//     const cartItems=useSelector(selectCartItems);
//     const cartTotal=useSelector(selectCartTotal);
//     return(
//         <CheckoutContainer>
//             <CheckoutHeader>
//                 {/* bcz we have 5 td we duplicated header-block 5 times */}
//                 <HeaderBlock>
//                     <span>Product</span>
//                 </HeaderBlock>
//                  <HeaderBlock>
//                    <span>Description</span>
//                 </HeaderBlock>
//                  <HeaderBlock>
//                    <span>Quantity</span>
//                 </HeaderBlock>
//                  <HeaderBlock>
//                    <span>Price</span>
//                 </HeaderBlock>
//                  <HeaderBlock>
//                    <span>Remove</span>
//                 </HeaderBlock>
//             </CheckoutHeader>

//                 {
//                     // displaying the items of the cart
//                     //here we do not need to use return ()
//                     // we directly use one line return
//                     cartItems.map((cartItem)=>(
//                     //destructure each item
//                     //Note we should make sure that we can access inc &dec & remove inside CheckoutItem
//                     //from the selector
//                     <CheckoutItem key={cartItem.id} cartItem={cartItem}/>

//                 )) }
//                 {/* This $ is not interpulation it's for currency to appear also we can the use symbol &#36; */}
//                 <Total>${cartTotal}</Total>
//             <PaymentForm/>
//         </CheckoutContainer>
//     );
// };

// export default Checkout;