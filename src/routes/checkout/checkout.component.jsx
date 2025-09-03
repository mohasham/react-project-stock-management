// we need to imoprt this bcz you need to display the items the user chose in the cart
// import { useContext } from 'react';
// import { CartContext } from '../../contexts/cart.context.jsx';
import { useSelector } from 'react-redux';
import { selectCartItems,selectCartTotal } from '../../store/cart/cart.selector';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// import PaymentForm from '../../components/payment-form/payment-form.component';
import './checkout.styles.scss'



 const Checkout=()=>{
    //destrucutre the cart context
    //const {cartItems,cartTotal}=useContext(CartContext);
    const cartItems=useSelector(selectCartItems);
    const cartTotal=useSelector(selectCartTotal);
    return(
         <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className='total'>Total: ${cartTotal}</span>
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