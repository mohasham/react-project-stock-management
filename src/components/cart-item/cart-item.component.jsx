import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity, selectedColor, selectedSize } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          {quantity} x ${price}
        </span>
        {selectedColor && (
  <span className="option">
    Color: <span className="color-indicator" style={{ backgroundColor: selectedColor.toLowerCase() }}></span>
  </span>)}
        {selectedSize && <span className="option">Size: {selectedSize}</span>}
      </div>
    </div>
  );
};

export default CartItem;
