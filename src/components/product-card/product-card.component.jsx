import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.reducer";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl, colors = [], sizes = [], colorStock = [], isActive } = product;

  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");

  const dispatch = useDispatch();

  // ✅ get stock for selected color
  const selectedColorStock = colorStock.find(cs => cs.color === selectedColor);
  const isOutOfStock = selectedColorStock ? selectedColorStock.quantity === 0 : false;

  // ✅ product is inactive if isActive is explicitly false
  const isInactive = isActive === false;

  const addProductToCart = () => {
    if (isOutOfStock || isInactive) return;
    dispatch(
      addItemToCart({
        ...product,
        selectedColor,
        selectedSize,
      })
    );
  };

  return (
    // ✅ apply disabled class if product is inactive
    <div className={`product-card ${isInactive ? 'product-card--inactive' : ''}`}>
      <img src={imageUrl} alt={name} className="product-card__image" />

      <div className="product-card__footer">
        <span className="product-card__name">{name}</span>
        <span className="product-card__price">${price}</span>
      </div>

      {/* ✅ show unavailable banner if inactive */}
      {isInactive && (
        <div className="product-card__unavailable">
          Currently Unavailable
        </div>
      )}

      {/* Color Options */}
      {colors.length > 0 && (
        <div className="product-card__options">
          <span className="product-card__label">Colors:</span>
          <div className="product-card__colors">
            {colors.map((color, idx) => {
              // ✅ check stock for each color
              const colorStockItem = colorStock.find(cs => cs.color === color);
              const colorOutOfStock = colorStockItem ? colorStockItem.quantity === 0 : false;

              return (
                <button
                  key={idx}
                  className={`product-card__color ${
                    selectedColor === color ? "product-card__color--active" : ""
                  } ${colorOutOfStock ? "product-card__color--out-of-stock" : ""}`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  onClick={() => !isInactive && setSelectedColor(color)}
                  title={colorOutOfStock ? `${color} - Out of Stock` : color}
                  disabled={isInactive}
                />
              );
            })}
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
                onClick={() => !isInactive && setSelectedSize(size)}
                disabled={isInactive}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ✅ disable button if out of stock or inactive */}
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
        disabled={isOutOfStock || isInactive}
      >
        {isInactive ? 'Unavailable' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
};

export default ProductCard;