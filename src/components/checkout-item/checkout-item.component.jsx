import { useDispatch } from 'react-redux';
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from '../../store/cart/cart.reducer';
import './checkout-item.styles.scss';

export const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, selectedColor, selectedSize } = cartItem;
  const dispatch = useDispatch();

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItem));
  const removeItemHandler = () => dispatch(removeItemFromCart(cartItem));

  return (
    <div className='checkout-item'>
      <div className='checkout-item__image-container'>
        <img src={imageUrl} alt={name} />
      </div>

      <div className='checkout-item__details'>
        <span className='checkout-item__name'>{name}</span>

        <div className='checkout-item__options'>
          {selectedColor && (
            <span className='checkout-item__color'>
              Color:{' '}
              <span
                className='checkout-item__color-swatch'
                style={{ backgroundColor: selectedColor }}
              />
            </span>
          )}

          {selectedSize && (
            <span className='checkout-item__size'>
              Size: {selectedSize}
            </span>
          )}
        </div>
      </div>

      <span className='checkout-item__quantity'>
        <div className='checkout-item__arrow' onClick={removeItemHandler}>
          &#10094;
        </div>

        <span className='checkout-item__value'>{quantity}</span>

        <div className='checkout-item__arrow' onClick={addItemHandler}>
          &#10095;
        </div>
      </span>

      <span className='checkout-item__price'>${price}</span>

      <div className='checkout-item__remove-button' onClick={clearItemHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;