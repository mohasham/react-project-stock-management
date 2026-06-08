import { useState, useEffect } from 'react';
import './admin-customers.styles.scss';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const getToken = () => localStorage.getItem('adminToken');

  // ===============================
  // Fetch Customers
  // ===============================
  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/customers', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setCustomers(data.customers);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // ===============================
  // Handle Toggle isActive
  // ===============================
  const handleToggle = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/customers/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchCustomers();
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Handle Delete
  // ===============================
  // const handleDelete = async (id) => {
  //   if (!window.confirm('Are you sure you want to delete this customer?')) return;
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/admin/customers/${id}`, {
  //       method: 'DELETE',
  //       headers: { Authorization: `Bearer ${getToken()}` }
  //     });
  //     const data = await response.json();
  //     if (!response.ok) throw new Error(data.message);
  //     await fetchCustomers();
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

  // ===============================
  // Filter customers by search
  // ✅ search by name or email
  // ===============================
  const filteredCustomers = customers.filter(customer => {
    const searchLower = search.toLowerCase();
    return (
      customer.displayName?.toLowerCase().includes(searchLower) ||
      customer.email?.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) return <div className='admin-customers__loading'>Loading customers...</div>;
  if (error) return <div className='admin-customers__error'>Error: {error}</div>;

  return (
    <div className='admin-customers'>

      {/* ===============================
          Header
      =============================== */}
      <div className='admin-customers__header'>
        <h1 className='admin-customers__title'>Customers</h1>
        <p className='admin-customers__count'>
          Total: {customers.length} customers
        </p>
      </div>

      {/* ===============================
          Search
      =============================== */}
      <div className='admin-customers__search'>
        <input
          type='text'
          placeholder='Search by name or email...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='admin-customers__search-input'
        />
        {search && (
          <p className='admin-customers__search-count'>
            Found {filteredCustomers.length} of {customers.length} customers
          </p>
        )}
      </div>

      {/* ===============================
          Customers Table
      =============================== */}
      <div className='admin-customers__table-wrapper'>
        <table className='admin-customers__table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Sign In Method</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.displayName}</td>
                <td>{customer.email}</td>
                {/* ✅ show if customer signed up with Google or email */}
                <td>
                  <span className={`admin-customers__method ${
                    customer.googleId
                      ? 'admin-customers__method--google'
                      : 'admin-customers__method--email'
                  }`}>
                    {customer.googleId ? '🔵 Google' : '📧 Email'}
                  </span>
                </td>
                <td>
                  <span className={`admin-customers__status ${
                    customer.isActive
                      ? 'admin-customers__status--active'
                      : 'admin-customers__status--inactive'
                  }`}>
                    {customer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(customer.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className='admin-customers__actions'>
                    <button
                      className={`admin-customers__toggle-btn ${
                        customer.isActive
                          ? 'admin-customers__toggle-btn--deactivate'
                          : 'admin-customers__toggle-btn--activate'
                      }`}
                      onClick={() => handleToggle(customer._id)}
                    >
                      {customer.isActive ? '🔴 Deactivate' : '🟢 Activate'}
                    </button>
                    {/* <button
                      className='admin-customers__delete-btn'
                      onClick={() => handleDelete(customer._id)}
                    >
                      🗑️ Delete
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;