import React from 'react';
import './navigation.styles.scss';

const Navigation = () => {
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
        <span className='navigation__cart'><i class='bi bi-cart4'></i></span>
        <button className='navigation__login-btn'>Login</button>
      </div>
    </nav>
  );
};

export default Navigation;
