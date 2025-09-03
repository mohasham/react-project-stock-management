import "./cart-item.styles.scss";

//this cartItem is the product we passed as a json obj
const CartItem=({cartItem})=>{
    const {name,imageUrl,price,quantity}=cartItem
    return (
          <div className='cart-item-container'>
            {/* this`` is used to cocantenate a var inside a string */}
            <img src={imageUrl} alt={`${name}`}/>
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span>{quantity} x ${price}</span>
            </div>
        </div>
    )
}

export default CartItem;