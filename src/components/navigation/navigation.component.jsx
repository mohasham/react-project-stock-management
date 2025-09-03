import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { Link } from 'react-router-dom';
import './navigation.styles.scss';

const Navigation = () => {
  const currentUser=useSelector(selectCurrentUser);
 
  const isCartOpen=useSelector(selectIsCartOpen);
  return (
    <nav className='navigation'>
      <div className='navigation__logo'>Rivo</div>
      <ul className='navigation__links'>
        <li><Link to= '/' className='navigation__link' >Home</Link></li>
        <li><Link to ='shop' className='navigation__link' >Shop</Link></li>
        <li><a className='navigation__link' href='#'>Features</a></li>
        <li><a className='navigation__link' href='#'>Contact</a></li>
      </ul>
      <div className='navigation__icons'>
        <CartIcon/>
        {isCartOpen && <CartDropdown/>}
        <button className='navigation__login-btn'>Login</button>
      </div>
    </nav>
  );
};

export default Navigation;
