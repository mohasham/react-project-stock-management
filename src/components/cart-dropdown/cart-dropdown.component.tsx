//we used this import when we talk about optimization
import { useCallback,useState,useMemo } from 'react';
import { useSelector } from 'react-redux';
//we needed this to  display the items added to cart to the dropdown
//import { useContext } from 'react';
// we used this useNavigation bcz we need when click go to check out to go to the routes
//it is a hook that allows us to get a navigate fn
//Note as a startaegy when changing to selector we change first the one that has more ref
import { useNavigate} from 'react-router-dom';
//we needed this to  display the items added to cart to the dropdown
import Button from '../button/button.component';
//we needed this to  display the items added to cart to the dropdown
//import { CartContext } from '../../contexts/cart.context';

//import CartItem to be displayed in the dropdown
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles'
import { CartDropdownCobtainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const sleep=(milliseconds:number):void=>{
    var start=new Date().getTime();
    for(var i=0; i<1e7; i++){
        if(new Date().getTime() -start> milliseconds){
            break;
        }
    }
}

const CartDropdown=()=>{
    //getting item from context
    //note remeber when state changes react notice & render
   // const {cartItems}=useContext(CartContext);
   //Note inorder to make sure we can get cartitems into the cartdropdown we have to make sure 
   //our product-card is able to access addItemToCart
    const cartItems=useSelector(selectCartItems);
    const navigate=useNavigate();
    //const[count,setCount]=useState(0);
//Note the diff btw useCallback and useMemo is that useCallback Memoize the fn where as useMemo memomize
//the return of the fn 
//Note useMemo will not rerender if we do not have any element in the dependency array
    // const hundredCount=useMemo(()=>{
    //     console.log('start');
    //     //this sleep will delay for 2 sec
    //     sleep(2000);
    //     console.log('end');
    // },[count]);
    //const val=hundredCount();
    //Note use Memo works the way we use reselect 
    //but the diff is that we are not passing parameters all the time inside our fns in react
    //alot of our functional components rely on outside variables such as the variables 
    //defined by state or defined by scope and props

    //This function is just to call the navigate
    //navigate means go to route /checkout
    //Note if there is a performance problem we optimize 
    //if we do not need do not optimize 
    //Note all of patterns of project we have learned are designed to be optimized
    //Note we talked about memoization when we used selectors
    //this use callback takes 2 args 1st param is the callback and the 2nd is a dependency array
    //Note with this useCallback if the element in dependency array does not change react will 
    //not reinitialize on render & rerender
    //Note raect is memomizing the fn itself not the return back of the fn
    const goToCheckoutHandler=useCallback(()=>{
        navigate('/checkout');
        //Note react knows with this hooks if the value of the navigate changes or not 
        //but we know that this navigate will not change so we can avoid putting it in dependency array
        //so it depends on the code developers & teams
    },[])
    return (
        <CartDropdownCobtainer>
            <CartItems>
                {
                    // if the cartItems is empty we want to display a msg
                    //so if the length of array >0 
                    //we want to show cartItems else we will show an error msg
                    cartItems.length ?(cartItems.map((item)=>
                    <CartItem key={item.id} cartItem={item}/>)
                ):(
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )
                }
            </CartItems>
            {/* foreach item we want to pass the CartItem component we have created */}
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownCobtainer>
    )
}

export default CartDropdown;
//before using ts 
// import { useSelector } from 'react-redux';
// //we needed this to  display the items added to cart to the dropdown
// //import { useContext } from 'react';
// // we used this useNavigation bcz we need when click go to check out to go to the routes
// //it is a hook that allows us to get a navigate fn
// //Note as a startaegy when changing to selector we change first the one that has more ref
// import { useNavigate} from 'react-router-dom';
// //we needed this to  display the items added to cart to the dropdown
// import Button from '../button/button.component';
// //we needed this to  display the items added to cart to the dropdown
// //import { CartContext } from '../../contexts/cart.context';

// //import CartItem to be displayed in the dropdown
// import CartItem from '../cart-item/cart-item.component';
// import { selectCartItems } from '../../store/cart/cart.selector';

// import './cart-dropdown.styles'
// import { CartDropdownCobtainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

// const CartDropdown=()=>{
//     //getting item from context
//     //note remeber when state changes react notice & render
//    // const {cartItems}=useContext(CartContext);
//    //Note inorder to make sure we can get cartitems into the cartdropdown we have to make sure 
//    //our product-card is able to access addItemToCart
//     const cartItems=useSelector(selectCartItems);
//     const navigate=useNavigate();
//     //This function is just to call the navigate
//     //navigate means go to route /checkout
//     const goToCheckoutHandler=()=>{
//         navigate('/checkout');
//     }
//     return (
//         <CartDropdownCobtainer>
//             <CartItems>
//                 {
//                     // if the cartItems is empty we want to display a msg
//                     //so if the length of array >0 
//                     //we want to show cartItems else we will show an error msg
//                     cartItems.length ?(cartItems.map((item)=>
//                     <CartItem key={item.id} cartItem={item}/>)
//                 ):(
//                     <EmptyMessage>Your cart is empty</EmptyMessage>
//                 )
//                 }
//             </CartItems>
//             {/* foreach item we want to pass the CartItem component we have created */}
//             <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
//         </CartDropdownCobtainer>
//     )
// }

// export default CartDropdown;
//before adding styled components

// //we needed this to  display the items added to cart to the dropdown
// import { useContext } from 'react';
// // we used this useNavigation bcz we need when click go to check out to go to the routes
// //it is a hook that allows us to get a navigate fn
// import { useNavigate} from 'react-router-dom';
// //we needed this to  display the items added to cart to the dropdown
// import Button from '../button/button.component';
// //we needed this to  display the items added to cart to the dropdown
// import { CartContext } from '../../context/cart.context';

// //import CartItem to be displayed in the dropdown
// import CartItem from '../cart-item/cart-item.component';

// import './cart-dropdown.styles'

// const CartDropdown=()=>{
//     //getting item from context
//     //note remeber when state changes react notice & render
//     const {cartItems}=useContext(CartContext);
//     const navigate=useNavigate();
//     //This function is just to call the navigate
//     //navigate means go to route /checkout
//     const goToCheckoutHandler=()=>{
//         navigate('/checkout');
//     }
//     return (
//         <div className='cart-dropdown-container'>
//             <div className='cart-items'>
    //             {
    //                 // if the cartItems is empty we want to display a msg
    //                 //so if the length of array >0 
    //                 //we want to show cartItems else we will show an error msg
    //                 cartItems.length ?(cartItems.map((item)=>
    //                 (<CartItem key={item.id} cartItem={item}/>
    //             ))):(
    //                 <span>Your cart is empty</span>
    //             )
    //             }
//            </div>
//             {/* foreach item we want to pass the CartItem component we have created */}
//             {}
//             <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
//         </div>
//     )
// }

// export default CartDropdown;