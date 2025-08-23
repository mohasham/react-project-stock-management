import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import './navigation.styles.scss';

const Navigation = () => {
  const currentUser=useSelector(selectCurrentUser);
 
  const isCartOpen=useSelector(selectIsCartOpen);
  return (
    <nav className='navigation'>
      <div className='navigation__logo'>Rivo</div>
      <ul className='navigation__links'>
        <li><a className='navigation__link' href='#'>Home</a></li>
        <li><a className='navigation__link' href='#'>Shop</a></li>
        <li><a className='navigation__link' href='#'>Features</a></li>
        <li><a className='navigation__link' href='#'>Contact</a></li>
      </ul>
      <div className='navigation__icons'>
        <CartIcon/>
        <button className='navigation__login-btn'>Login</button>
      </div>
    </nav>
  );
};

export default Navigation;
