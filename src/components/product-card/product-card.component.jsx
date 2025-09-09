import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, colors = [], sizes = [] } = product;

  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");

  const dispatch = useDispatch();

  const addProductToCart = () => {
    dispatch(
      addItemToCart({
        ...product,
        selectedColor,
        selectedSize,
      })
    );
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-card__image" />

      <div className="product-card__footer">
        <span className="product-card__name">{name}</span>
        <span className="product-card__price">${price}</span>
      </div>

      {/* Color Options */}
      {colors.length > 0 && (
        <div className="product-card__options">
          <span className="product-card__label">Colors:</span>
          <div className="product-card__colors">
            {colors.map((color, idx) => (
              <button
                key={idx}
                className={`product-card__color ${
                  selectedColor === color ? "product-card__color--active" : ""
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Options */}
      {sizes.length > 0 && (
        <div className="product-card__options">
          <span className="product-card__label">Sizes:</span>
          <div className="product-card__sizes">
            {sizes.map((size, idx) => (
              <button
                key={idx}
                className={`product-card__size ${
                  selectedSize === size ? "product-card__size--active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
