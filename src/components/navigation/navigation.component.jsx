import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { useSelector, useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.reducer';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { Link } from 'react-router-dom';
import './navigation.styles.scss';
import { useState } from 'react';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  const toggleLoginMenu = () => setIsLoginMenuOpen(!isLoginMenuOpen);
  const closeLoginMenu = () => setIsLoginMenuOpen(false);

  const handleSignOut = () => {
    dispatch(signOutStart());
  };

  return (
    <nav className='navigation'>
      <div className='navigation__logo'>Rivo</div>
      <ul className='navigation__links'>
        <li><Link to='/' className='navigation__link'>Home</Link></li>
        <li><Link to='shop' className='navigation__link'>Shop</Link></li>
        <li><a className='navigation__link' href='#'>Features</a></li>
        <li><a className='navigation__link' href='#'>Contact</a></li>
      </ul>
      <div className='navigation__icons'>
        <CartIcon />
        {isCartOpen && <CartDropdown />}

        {/* Show Sign Out if logged in, otherwise show Login dropdown */}
        {currentUser ? (
          <button
            className='navigation__login-btn'
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <div className='navigation__login-dropdown'>
            <button
              className='navigation__login-btn'
              onClick={toggleLoginMenu}
            >
              Login ▼
            </button>

            {isLoginMenuOpen && (
              <div className='navigation__dropdown-menu'>
                <Link
                  to='/auth'
                  className='navigation__dropdown-item'
                  onClick={closeLoginMenu}
                >
                  Customer Login
                </Link>

                <Link
                  to='/auth/admin-login'
                  className='navigation__dropdown-item'
                  onClick={closeLoginMenu}
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navigation;
