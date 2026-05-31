import { useSelector } from 'react-redux';
//we needed this to  display the items added to cart to the dropdown
//import { useContext } from 'react';
// we used this useNavigation bcz we need when click go to check out to go to the routes
//it is a hook that allows us to get a navigate fn
//Note as a startaegy when changing to selector we change first the one that has more ref
import { useNavigate } from 'react-router-dom';

import Button from '../button/button.component';
//we needed this to  display the items added to cart to the dropdown
//import { CartContext } from '../../contexts/cart.context';

//import CartItem to be displayed in the dropdown
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles.scss'
// import { CartDropdownCobtainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

export const CartDropdown = () => {
    //getting item from context
    //note remeber when state changes react notice & render
    // const {cartItems}=useContext(CartContext);

    //Note inorder to make sure we can get cartitems into the cartdropdown we have to make sure 
    //our product-card is able to access addItemToCart
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();

    //This function is just to call the navigate
    //navigate means go to route /checkout
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };

    return (
        <div className='cart-dropdown'>
            <div className='cart-dropdown__container'>
                <div className='cart-dropdown__items'>
                    {
                        // if the cartItems is empty we want to display a msg
                        //so if the length of array >0 
                        //we want to show cartItems else we will show an error msg
                        cartItems.length ? (
                            cartItems.map((item) => (
                                <CartItem key={item.id} cartItem={item} />
                            ))
                        ) : (
                            <span className='cart-dropdown__empty-message'>
                                Your cart is empty
                            </span>
                        )
                    }
                </div>

                {/* foreach item we want to pass the CartItem component we have created */}
                {}

                <Button className='cart-dropdown__button' onClick={goToCheckoutHandler}>
                    GO TO CHECKOUT
                </Button>
            </div>
        </div>
    );
};

export default CartDropdown;