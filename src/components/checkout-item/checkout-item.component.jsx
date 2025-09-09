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
    <div className='checkout-item-container'>
      <div className='image-container'>
        <img src={imageUrl} alt={`${name}`} />
      </div>

      <div className='details'>
        <span className='name'>{name}</span>

        <div className='options'>
          {selectedColor && (
            <span className='color'>
              Color:{" "}
              <span
                className='color-swatch'
                style={{ backgroundColor: selectedColor }}
              />
            </span>
          )}
          {selectedSize && <span className='size'>Size: {selectedSize}</span>}
        </div>
      </div>

      <span className='quantity'>
        <div className='arrow' onClick={removeItemHandler}>&#10094;</div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={addItemHandler}>&#10095;</div>
      </span>

      <span className='price'>${price}</span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
