// we need to import this useContext & CartContext to use the methods we have made there
import { useSelector,useDispatch } from 'react-redux';
//this import was used before using slice
//import { selectCartItems } from '../../store/cart/cart.selector.js';
//this import was used before using slice
// import { clearItemFromCart,addItemToCart,removeItemFromCart } from '../../store/cart/cart.action.js';
import { clearItemFromCart,addItemToCart,removeItemFromCart } from '../../store/cart/cart.reducer';
//import { CartContext } from '../../contexts/cart.context.jsx';
const CheckoutItem=({cartItem})=>{
    const {name,imageUrl,price,quantity}=cartItem;
    const dispatch=useDispatch();
    //const cartItems=useSelector(selectCartItems);

   // const {clearItemFromCart,addItemToCart,removeItemToCart}=useContext(CartContext);
    //---------NOTE----------------
    //we have made this handler instead of onclick{()=>clearItemFromCart}
    //another reason is if we change the function we have a very clear idea where these functions are
    //instead of being inside the jsx
    //they are in place were we instatite our helper functions in addition to optimize this code
    //before using selectors of redux
    // const clearItemHandler =()=>clearItemFromCart(cartItem);
    // const addItemHandler=()=>addItemToCart(cartItem);
    // const removeItemHandler=()=>removeItemFromCart(cartItem);
    //this was used before using slice
    //const clearItemHandler =()=>dispatch(clearItemFromCart(cartItems,cartItem));
    // const addItemHandler=()=>dispatch(addItemToCart(cartItems,cartItem));
    //const removeItemHandler=()=>dispatch(removeItemFromCart(cartItems,cartItem));
    //mow we are getting them direcrly from createSlice which means we are no longer need to use
    //selectCartItems  selector
    const clearItemHandler =()=>dispatch(clearItemFromCart(cartItem));
    const addItemHandler=()=>dispatch(addItemToCart(cartItem));
    const removeItemHandler=()=>dispatch(removeItemFromCart(cartItem));
    return(
               <div className='checkout-item-container'>
//             <div className='image-container'>
//                 <img src={imageUrl} alt={`${name}`}/>
//             </div>
//             <span className='name'>{name}</span>
//             <span className='quantity'>
//                 <div className='arrow' onClick={removeItemHandler}>
//                     {/* This is a left arrow using html symbol &#10094; */}
//                     &#10094;
//                 </div>
//                 {/* we put the qty inside a span alone bcz we want to style it */}
//                 <span className='value'>{quantity}</span>
//                 <div className='arrow'onClick={addItemHandler}>
//                     {/* This is a left arrow using html symbol &#10094; */}
//                 &#10095;
//                 </div>
//             </span>
//             <span className='price'>{price}</span>
//             {/* This &#10005; is special character in html we want to display x button in a specific format */}
//             <div className='remove-button'onClick={clearItemHandler}>
//                 &#10005;
//              </div>
//         </div>
    )
    
}
export default CheckoutItem;


//before using styled component

// //we need to import this useContext & CartContext to use the methods we have made there
// import { useContext } from 'react';
// import { CartContext } from '../../context/cart.context';
// import './checkout-item.styles.jsx';
// const CheckoutItem=({cartItem})=>{
//     const {name,imageUrl,price,quantity}=cartItem;

//     const {clearItemFromCart,addItemToCart,removeItemToCart}=useContext(CartContext);
//     //---------NOTE----------------
//     //we have made this handler instead of onclick{()=>clearItemFromCart}
//     //another reason is if we change the function we have a very clear idea where these functions are
//     //instead of being inside the jsx
//     //they are in place were we instatite our helper functions in addition to optimize this code
//     const clearItemHandler =()=>clearItemFromCart(cartItem);
//     const addItemHandler=()=>addItemToCart(cartItem);
//     const removeItemHandler=()=>removeItemToCart(cartItem);
//     return(
//         <div className='checkout-item-container'>
//             <div className='image-container'>
//                 <img src={imageUrl} alt={`${name}`}/>
//             </div>
//             <span className='name'>{name}</span>
//             <span className='quantity'>
//                 <div className='arrow' onClick={removeItemHandler}>
//                     {/* This is a left arrow using html symbol &#10094; */}
//                     &#10094;
//                 </div>
//                 {/* we put the qty inside a span alone bcz we want to style it */}
//                 <span className='value'>{quantity}</span>
//                 <div className='arrow'onClick={addItemHandler}>
//                     {/* This is a left arrow using html symbol &#10094; */}
//                 &#10095;
//                 </div>
//             </span>
//             <span className='price'>{price}</span>
//             {/* This &#10005; is special character in html we want to display x button in a specific format */}
//             <div className='remove-button'onClick={clearItemHandler}>
//                 &#10005;
//              </div>
//         </div>
//     )
    
// }
// export default CheckoutItem;