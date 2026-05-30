import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { adminSignOutStart } from '../../../store/admin/admin.reducer';
import { selectCurrentAdmin } from '../../../store/admin/admin.selector';
import './admin-layout.styles.scss';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);

  const handleSignOut = () => {
    dispatch(adminSignOutStart());
  };

  return (
    <div className='admin-layout'>
      <aside className='admin-layout__sidebar'>
        <div className='admin-layout__logo'>
          <h2>Rivo Admin</h2>
          <span>{currentAdmin?.displayName}</span>
        </div>

        <nav className='admin-layout__nav'>
          <NavLink
            to='/admin'
            end
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to='/admin/categories'
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            🏷️ Categories
          </NavLink>

          <NavLink
            to='/admin/products'
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            📦 Products
          </NavLink>

          <NavLink
            to='/admin/orders'
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            🛍️ Orders
          </NavLink>

          <NavLink
            to='/admin/customers'
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            👥 Customers
          </NavLink>

          <NavLink
            to='/admin/create-admin'
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            ➕ Create Admin
          </NavLink>
        </nav>

        <button
          className='admin-layout__signout'
          onClick={handleSignOut}
        >
          🚪 Sign Out
        </button>
      </aside>

      <main className='admin-layout__content'>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;