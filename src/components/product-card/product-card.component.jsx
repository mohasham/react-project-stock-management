
import { useContext } from 'react';

// import { CartContext } from '../../contexts/cart.context.jsx';
// here we want to use a button so we imoprted the component we created
// this is reusability

//we impoted this bcz we need tou use addItemToCart
//we need this dispatch bcz every single action needs to be dispatched
import { useDispatch,useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
//this was used before using slice
//import { addItemToCart } from '../../store/cart/cart.action;
import { addItemToCart } from '../../store/cart/cart.action';



//we imported this BUTTON_TYPE_CLASSES bcz it's a json obj outside the button Component 
//we need it to pass the buttonType
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';

import { Footer, Name, Price, ProductCartContainer } from './product-card.styles';
//remeber first letter of every word in the name should be capital 
//to let react reads it 
const ProductCard=({product})=>{
    //distructure of what I need insted of writing product. everytime
    const {name,price,imageUrl}=product;
    // you are destructuring the context value and extracting the addItemToCart function from it.
    //const {addItemToCart}=useContext(CartContext);
    //bring dispatch
    const dispatch=useDispatch();
    //this was used before using slice
   // const cartItems=useSelector(selectCartItems);

    //instead of doing ()=>addItemToCart(product) inside onclick we made this method/function
    //Note we can def this function inside the jsx but 1 benifit in this way it's more easy to optimize instead
    //of reading it from the whole jsx
    //this was used before using slice
    //const addProductToCart=()=>dispatch(addItemToCart(cartItems,product));
    // const addProductToCart=()=>dispatch(addItemToCart(product));
  return( 
     <div className='product-card-container'>
        <img src={imageUrl} alt={`${name}`}/>
        <div className='footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
        {/* Note this button from black to white so unlike typical button so it's inverted buttonType */}
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={()=>addItemToCart(product)}>Add to card</Button>
    </div>
);
};

export default ProductCard;

//before using ts

//import { useContext } from 'react';

//import { CartContext } from '../../contexts/cart.context.jsx';
//here we want to use a button so we imoprted the component we created
//this is reusability

// //we impoted this bcz we need tou use addItemToCart
// //we need this dispatch bcz every single action needs to be dispatched
// import { useDispatch,useSelector } from 'react-redux';
// import { selectCartItems } from '../../store/cart/cart.selector';
// //this was used before using slice
// //import { addItemToCart } from '../../store/cart/cart.action;
// import { addItemToCart } from '../../store/cart/cart.action';



// //we imported this BUTTON_TYPE_CLASSES bcz it's a json obj outside the button Component 
// //we need it to pass the buttonType
// import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';

// import { Footer, Name, Price, ProductCartContainer } from './product-card.styles';
// //remeber first letter of every word in the name should be capital 
// //to let react reads it 
// const ProductCard=({product})=>{
//     //distructure of what I need insted of writing product. everytime
//     const {name,price,imageUrl}=product;
//     // you are destructuring the context value and extracting the addItemToCart function from it.
//     //const {addItemToCart}=useContext(CartContext);
//     //bring dispatch
//     const dispatch=useDispatch();
//     //this was used before using slice
//    // const cartItems=useSelector(selectCartItems);

//     //instead of doing ()=>addItemToCart(product) inside onclick we made this method/function
//     //Note we can def this function inside the jsx but 1 benifit in this way it's more easy to optimize instead
//     //of reading it from the whole jsx
//     //this was used before using slice
//     //const addProductToCart=()=>dispatch(addItemToCart(cartItems,product));
//     const addProductToCart=()=>dispatch(addItemToCart(product));
//   return( 
//      <ProductCartContainer>
//         <img src={imageUrl} alt={`${name}`}/>
//         <Footer>
//             <Name>{name}</Name>
//             <Price>{price}</Price>
//         </Footer>
//         {/* Note this button from black to white so unlike typical button so it's inverted buttonType */}
//         <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={()=>addProductToCart(product)}>Add to card</Button>
//     </ProductCartContainer>
// );
// };

// export default ProductCard;

//before adding styled component 
// import { useContext } from 'react';

// import { CartContext } from '../../context/cart.context';
// //here we want to use a button so we imoprted the component we created
// //this is reusability

// //we imported this BUTTON_TYPE_CLASSES bcz it's a json obj outside the button Component 
// //we need it to pass the buttonType
// import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component';

// import './product-card.styles.jsx'
// //remeber first letter of every word in the name should be capital 
// //to let react reads it 
// const ProductCard=({product})=>{
//     //distructure of what I need insted of writing product. everytime
//     const {name,price,imageUrl}=product;
//     // you are destructuring the context value and extracting the addItemToCart function from it.
//     const {addItemToCart}=useContext(CartContext);
//     //instead of doing ()=>addItemToCart(product) inside onclick we made this method/function
//     //Note we can def this function inside the jsx but 1 benifit in this way it's more easy to optimize instead
//     //of reading it from the whole jsx
//     const addProductToCart=()=>addItemToCart(product);
//   return( 
//      <div className='product-card-container'>
//         <img src={imageUrl} alt={`${name}`}/>
//         <div className='footer'>
//             <span className='name'>{name}</span>
//             <span className='price'>{price}</span>
//         </div>
//         {/* Note this button from black to white so unlike typical button so it's inverted buttonType */}
//         <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={()=>addItemToCart(product)}>Add to card</Button>
//     </div>
// );
// };

// export default ProductCard;
