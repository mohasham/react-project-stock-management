import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, selectedColor, selectedSize } = cartItem;

  return (
    <div className="cart-item">
      <img className="cart-item__image" src={imageUrl} alt={name} />

      <div className="cart-item__details">
        <span className="cart-item__name">{name}</span>

        <span className="cart-item__price">
          {quantity} x ${price}
        </span>

        {selectedColor && (
          <span className="cart-item__option">
            Color:
            <span
              className="cart-item__color-indicator"
              style={{ backgroundColor: selectedColor.toLowerCase() }}
            />
          </span>
        )}

        {selectedSize && (
          <span className="cart-item__option">
            Size: {selectedSize}
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItem;