import { createContext, useContext } from 'react';//we needed this to change the state of isCartOpen in the cart
//import the svg we import the ReactComponent tp treat the svg as a component 
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

//import { CartContext } from '../../contexts/cart.context';//we needed this to change the state of isCartOpen in the cart
import { useDispatch,useSelector } from 'react-redux';
//importing selectors & action creators
import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
//this was used before create slice 
// import { setIsCartOpen } from '../../store/cart/cart.action';
import { setIsCartOpen } from '../../store/cart/cart.reducer';



const CartIcon=()=>{
    //we need this dispatch to dispatch our action
    const dispatch=useDispatch();
    //const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
    const cartCount=useSelector(selectCartCount);
//this method/function is used to trigger the Cart if the cart is closed open it & vise-versa (to show the dropdown or not)
//this method calls setIsCartOpen but sets it with the oppsite value
const isCartOpen=useSelector(selectIsCartOpen);
//here setIsCartOpen is know action creator
    const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen))
       return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            {/* This is the number of items in the shopping cart */}
            <span className='item-count'>{cartCount}</span>

        </div>
    )
}

export default CartIcon;

//before using ts 
// import { createContext, useContext } from 'react';//we needed this to change the state of isCartOpen in the cart
// //import the svg we import the ReactComponent tp treat the svg as a component 
// // import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

// //import { CartContext } from '../../contexts/cart.context';//we needed this to change the state of isCartOpen in the cart
// import { useDispatch,useSelector } from 'react-redux';
// //importing selectors & action creators
// import { selectCartCount,selectIsCartOpen } from '../../store/cart/cart.selector';
// //this was used before create slice 
// // import { setIsCartOpen } from '../../store/cart/cart.action';
// import { setIsCartOpen } from '../../store/cart/cart.action';

// import { ShoppingIcon,CartIcpnContainer, ItemCount } from './cart-icon.styles';

// const CartIcon=()=>{
//     //we need this dispatch to dispatch our action
//     const dispatch=useDispatch();
//     //const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
//     const cartCount=useSelector(selectCartCount);
// //this method/function is used to trigger the Cart if the cart is closed open it & vise-versa (to show the dropdown or not)
// //this method calls setIsCartOpen but sets it with the oppsite value
// const isCartOpen=useSelector(selectIsCartOpen);
// //here setIsCartOpen is know action creator
//     const toggleIsCartOpen=()=>dispatch(setIsCartOpen(!isCartOpen))
//     return (
//         <CartIcpnContainer onClick={toggleIsCartOpen}>
//             <ShoppingIcon />
//             {/* This is the number of items in the shopping cart */}
//             <ItemCount>{cartCount}</ItemCount>

//         </CartIcpnContainer>
//     )
// }

// export default CartIcon;

//before adding styled components 
// import { createContext, useContext } from 'react';//we needed this to change the state of isCartOpen in the cart
// //import the svg we import the ReactComponent tp treat the svg as a component 
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

// import { CartContext } from '../../context/cart.context';//we needed this to change the state of isCartOpen in the cart

// import './cart-icon.styles.scss'

// const CartIcon=()=>{
//     const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
// //this method/function is used to trigger the Cart if the cart is closed open it & vise-versa (to show the dropdown or not)
// //this method calls setIsCartOpen but sets it with the oppsite value
//     const toggleIsCartOpen=()=>{setIsCartOpen(!isCartOpen)}
//     return (
//         <div className='cart-icon-container' onClick={toggleIsCartOpen}>
//             <ShoppingIcon className='shopping-icon'/>
//             {/* This is the number of items in the shopping cart */}
//             <span className='item-count'>{cartCount}</span>

//         </div>
//     )
// }

// export default CartIcon; 