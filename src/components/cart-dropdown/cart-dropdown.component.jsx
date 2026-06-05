import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import './cart-dropdown.styles.scss';

export const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown'>
      <div className='cart-dropdown__container'>

        <div className='cart-dropdown__items'>
          {
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

        <div className="cart-dropdown__button">
          <Button
            buttonType={BUTTON_TYPE_CLASSES.base}
            onClick={goToCheckoutHandler}
          >
            GO TO CHECKOUT
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CartDropdown;