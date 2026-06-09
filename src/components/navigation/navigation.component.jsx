import React from 'react';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { useSelector, useDispatch } from 'react-redux';
import { signOutStart } from '../../store/user/user.reducer';
import { adminSignOutStart } from '../../store/admin/admin.reducer';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectCurrentAdmin } from '../../store/admin/admin.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { Link } from 'react-router-dom';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import SignOutIcon from '../icons/sign-out-icon.component';
import './navigation.styles.scss';
import { useState } from 'react';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const currentAdmin = useSelector(selectCurrentAdmin);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);

  const toggleLoginMenu = () => setIsLoginMenuOpen(!isLoginMenuOpen);
  const closeLoginMenu = () => setIsLoginMenuOpen(false);

  const handleCustomerSignOut = () => {
    dispatch(signOutStart());
  };

  const handleAdminSignOut = () => {
    dispatch(adminSignOutStart());
  };

  return (
    <nav className='navigation'>
      <div className='navigation__logo'>Rivo</div>
      <ul className='navigation__links'>
        <li><Link to='/' className='navigation__link'>Home</Link></li>
        <li><Link to='shop' className='navigation__link'>Shop</Link></li>
        <li><Link to='features' className='navigation__link'>Features</Link></li>
        <li><a className='navigation__link' href='#'>Contact</a></li>
      </ul>
      <div className='navigation__icons'>
        <CartIcon />
        {isCartOpen && <CartDropdown />}

        {/* ✅ show admin sign out if admin is logged in */}
        {currentAdmin ? (
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.signOut}
            onClick={handleAdminSignOut}
          >
            <SignOutIcon /> Admin Sign Out
          </Button>
        ) : currentUser ? (
          // ✅ show customer sign out if customer is logged in
          <Button
            type='button'
            buttonType={BUTTON_TYPE_CLASSES.signOut}
            onClick={handleCustomerSignOut}
          >
            <SignOutIcon /> Sign Out
          </Button>
        ) : (
          // ✅ show login dropdown if nobody is logged in
          <div className='navigation__login-dropdown'>
            <Button
              type='button'
              onClick={toggleLoginMenu}
            >
              Login ▼
            </Button>

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