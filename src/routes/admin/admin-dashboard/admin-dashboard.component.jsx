import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentAdmin } from '../../../store/admin/admin.selector';
import './admin-dashboard.styles.scss';

const AdminDashboard = () => {
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('http://localhost:5000/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setStats(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <div className='admin-dashboard__loading'>Loading stats...</div>;
  if (error) return <div className='admin-dashboard__error'>Error: {error}</div>;

  return (
    <div className='admin-dashboard'>
      <h1 className='admin-dashboard__title'>
        Welcome, {currentAdmin?.displayName} 👋
      </h1>
      <p className='admin-dashboard__subtitle'>Here's your store overview</p>

      {/* ✅ Stat Cards */}
      <div className='admin-dashboard__cards'>
        <div className='admin-dashboard__card'>
          <span className='admin-dashboard__card-icon'>👥</span>
          <div className='admin-dashboard__card-info'>
            <h3>Total Customers</h3>
            <p>{stats.totalCustomers}</p>
          </div>
        </div>

        <div className='admin-dashboard__card'>
          <span className='admin-dashboard__card-icon'>📦</span>
          <div className='admin-dashboard__card-info'>
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
        </div>

        <div className='admin-dashboard__card'>
          <span className='admin-dashboard__card-icon'>🏷️</span>
          <div className='admin-dashboard__card-info'>
            <h3>Total Categories</h3>
            <p>{stats.totalCategories}</p>
          </div>
        </div>

        <div className='admin-dashboard__card'>
          <span className='admin-dashboard__card-icon'>🛍️</span>
          <div className='admin-dashboard__card-info'>
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>

        <div className='admin-dashboard__card admin-dashboard__card--green'>
          <span className='admin-dashboard__card-icon'>💰</span>
          <div className='admin-dashboard__card-info'>
            <h3>Total Revenue</h3>
            <p>${(stats.totalRevenue || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className='admin-dashboard__card admin-dashboard__card--blue'>
          <span className='admin-dashboard__card-icon'>💵</span>
          <div className='admin-dashboard__card-info'>
            <h3>Avg Profit Per Order</h3>
            <p>${(stats.avgProfitPerOrder || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* ✅ Profit Per Category Table */}
      <div className='admin-dashboard__section'>
        <h2 className='admin-dashboard__section-title'>Profit Per Category</h2>
        <table className='admin-dashboard__table'>
          <thead>
            <tr>
              <th>Category</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {stats.profitPerCategory.map((item) => (
              <tr key={item.category}>
                <td>{item.category}</td>
                <td>${(item.profit || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;