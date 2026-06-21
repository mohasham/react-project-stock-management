import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { adminSignOutStart } from '../../../store/admin/admin.reducer';
import { selectCurrentAdmin } from '../../../store/admin/admin.selector';
import './admin-layout.styles.scss';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ mobile sidebar toggle state

  const handleSignOut = () => {
    dispatch(adminSignOutStart());
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // ✅ toggle hamburger
  const closeSidebar = () => setIsSidebarOpen(false); // ✅ close on nav-link click or overlay click

  return (
    <div className='admin-layout'>

      {/* ✅ hamburger button — only visible on mobile via CSS */}
      <button
        className='admin-layout__mobile-toggle'
        onClick={toggleSidebar}
        aria-label='Toggle sidebar'
      >
        {isSidebarOpen ? '✕' : '☰'}
      </button>

      {/* ✅ dark overlay shown behind sidebar on mobile when open — clicking it closes sidebar */}
      {isSidebarOpen && (
        <div className='admin-layout__overlay' onClick={closeSidebar} />
      )}

      <aside className={`admin-layout__sidebar ${isSidebarOpen ? 'admin-layout__sidebar--open' : ''}`}>
        <div className='admin-layout__logo'>
          <h2>Rivo Admin</h2>
          <span>{currentAdmin?.displayName}</span>
        </div>

        <nav className='admin-layout__nav'>
          <NavLink
            to='/admin'
            end
            onClick={closeSidebar} // ✅ close sidebar after navigating on mobile
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to='/admin/categories'
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            🏷️ Categories
          </NavLink>

          <NavLink
            to='/admin/products'
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            📦 Products
          </NavLink>

          <NavLink
            to='/admin/orders'
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            🛍️ Orders
          </NavLink>

          <NavLink
            to='/admin/customers'
            onClick={closeSidebar}
            className={({ isActive }) =>
              isActive ? 'admin-layout__nav-item admin-layout__nav-item--active' : 'admin-layout__nav-item'
            }
          >
            👥 Customers
          </NavLink>

          <NavLink
            to='/admin/create-admin'
            onClick={closeSidebar}
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