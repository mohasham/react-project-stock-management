import react from 'react';
//import the svg we import the ReactComponent tp treat the svg as a component 
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

//import { CartContext } from '../../contexts/cart.context';//we needed this to change the state of isCartOpen in the cart
import { useDispatch, useSelector } from 'react-redux';
//importing selectors & action creators
//we rename from ShoppingIcon to ShoppingSvg not to make conflict for renaming the styled component
//to solve the problem of this import we need to make something global 
//for this reason we made a file inside src called custom.d.ts this file ts automatically looks for it
//this solves the error of moudle '../../assets/shopping-bag.svg' 
//Now we have an error with ReactComponent 

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';

import { setIsCartOpen } from '../../store/cart/cart.reducer';
import './cart-icon.styles.scss';

export const CartIcon = () => {
    //we need this dispatch to dispatch our action
    const dispatch = useDispatch();

    //const {isCartOpen,setIsCartOpen,cartCount}=useContext(CartContext);
    const cartCount = useSelector(selectCartCount);

    //this method/function is used to trigger the Cart if the cart is closed open it & vise-versa (to show the dropdown or not)
    //this method calls setIsCartOpen but sets it with the oppsite value
    const isCartOpen = useSelector(selectIsCartOpen);

    //here setIsCartOpen is know action creator
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <div className='cart-icon' onClick={toggleIsCartOpen}>
            <div className='cart-icon__container'>
                <ShoppingIcon className='cart-icon__icon' />
                {/* This is the number of items in the shopping cart */}
                <span className='cart-icon__count'>{cartCount}</span>
            </div>
        </div>
    );
};

export default CartIcon;