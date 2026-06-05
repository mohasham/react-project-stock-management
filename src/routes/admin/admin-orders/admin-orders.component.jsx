import { useState, useEffect } from 'react';
import './admin-orders.styles.scss';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ for order details modal

  const getToken = () => localStorage.getItem('adminToken');

  // ===============================
  // Fetch Orders
  // ===============================
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/admin', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setOrders(data.orders);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ===============================
  // Update Order Status
  // ===============================
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/admin/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchOrders();
      // ✅ update selected order if it's open
      if (selectedOrder?._id === id) {
        setSelectedOrder(data.order);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Delete Order
  // ===============================
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/orders/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      await fetchOrders();
      // ✅ close modal if deleted order was open
      if (selectedOrder?._id === id) setSelectedOrder(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // ===============================
  // Get status badge class
  // ===============================
  const getStatusClass = (status) => {
    const classes = {
      pending: 'admin-orders__status--pending',
      processing: 'admin-orders__status--processing',
      shipped: 'admin-orders__status--shipped',
      delivered: 'admin-orders__status--delivered',
      cancelled: 'admin-orders__status--cancelled',
    };
    return classes[status] || '';
  };

  // ===============================
  // Filter orders by status
  // ===============================
  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter(o => o.status === filterStatus);

  if (isLoading) return <div className='admin-orders__loading'>Loading orders...</div>;
  if (error) return <div className='admin-orders__error'>Error: {error}</div>;

  return (
    <div className='admin-orders'>

      {/* ===============================
          Header
      =============================== */}
      <div className='admin-orders__header'>
        <h1 className='admin-orders__title'>Orders</h1>
      </div>

      {/* ===============================
          Filter by Status + Count
      =============================== */}
      <div className='admin-orders__filter'>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className='admin-orders__filter-select'
        >
          <option value='all'>All Orders ({orders.length})</option>
          <option value='pending'>Pending ({orders.filter(o => o.status === 'pending').length})</option>
          <option value='processing'>Processing ({orders.filter(o => o.status === 'processing').length})</option>
          <option value='shipped'>Shipped ({orders.filter(o => o.status === 'shipped').length})</option>
          <option value='delivered'>Delivered ({orders.filter(o => o.status === 'delivered').length})</option>
          <option value='cancelled'>Cancelled ({orders.filter(o => o.status === 'cancelled').length})</option>
        </select>

        {/* ✅ show filtered count */}
        <p className='admin-orders__count'>
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>

      {/* ===============================
          Orders Table
      =============================== */}
      <div className='admin-orders__table-wrapper'>
        <table className='admin-orders__table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                {/* ✅ show short order ID */}
                <td className='admin-orders__id'>
                  #{order._id.slice(-6).toUpperCase()}
                </td>
                <td>
                  <div className='admin-orders__customer'>
                    <span>{order.customer?.displayName || 'N/A'}</span>
                    <span className='admin-orders__customer-email'>
                      {order.customer?.email || ''}
                    </span>
                  </div>
                </td>
                <td>${order.totalPrice?.toFixed(2)}</td>
                <td>
                  <span className={`admin-orders__status ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <span className={`admin-orders__payment ${
                    order.paymentStatus === 'paid'
                      ? 'admin-orders__payment--paid'
                      : order.paymentStatus === 'refunded'
                      ? 'admin-orders__payment--refunded'
                      : 'admin-orders__payment--unpaid'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className='admin-orders__actions'>
                    {/* ✅ view order details */}
                    <button
                      className='admin-orders__view-btn'
                      onClick={() => setSelectedOrder(order)}
                    >
                      👁️ View
                    </button>

                    {/* ✅ update status dropdown */}
                    <select
                      className='admin-orders__status-select'
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    >
                      <option value='pending'>Pending</option>
                      <option value='processing'>Processing</option>
                      <option value='shipped'>Shipped</option>
                      <option value='delivered'>Delivered</option>
                      <option value='cancelled'>Cancelled</option>
                    </select>

                    <button
                      className='admin-orders__delete-btn'
                      onClick={() => handleDelete(order._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===============================
          Order Details Modal
      =============================== */}
      {selectedOrder && (
        <div className='admin-orders__modal-overlay'>
          <div className='admin-orders__modal'>
            <div className='admin-orders__modal-header'>
              <h2>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h2>
              <button
                className='admin-orders__modal-close'
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            {/* Customer Info */}
            <div className='admin-orders__modal-section'>
              <h3>Customer</h3>
              <p>{selectedOrder.customer?.displayName}</p>
              <p>{selectedOrder.customer?.email}</p>
            </div>

            {/* Shipping Address */}
            <div className='admin-orders__modal-section'>
              <h3>Shipping Address</h3>
              <p>{selectedOrder.shippingAddress?.fullName}</p>
              <p>{selectedOrder.shippingAddress?.address}</p>
              <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.country}</p>
              <p>{selectedOrder.shippingAddress?.phone}</p>
            </div>

            {/* Order Items */}
            <div className='admin-orders__modal-section'>
              <h3>Order Items</h3>
              <table className='admin-orders__items-table'>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Cost</th>
                    <th>Profit</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.orderItems?.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.title}</td>
                      <td>{item.selectedColor || '-'}</td>
                      <td>{item.selectedSize || '-'}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price?.toFixed(2)}</td>
                      <td>${item.costPrice?.toFixed(2)}</td>
                      {/* ✅ calculate profit per item */}
                      <td>${((item.price - item.costPrice) * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary */}
            <div className='admin-orders__modal-summary'>
              <div className='admin-orders__modal-summary-row'>
                <span>Total Revenue:</span>
                <span>${selectedOrder.totalPrice?.toFixed(2)}</span>
              </div>
              <div className='admin-orders__modal-summary-row'>
                <span>Total Profit:</span>
                {/* ✅ calculate total profit */}
                <span>${selectedOrder.orderItems?.reduce((total, item) => {
                  return total + ((item.price - item.costPrice) * item.quantity);
                }, 0).toFixed(2)}</span>
              </div>
              <div className='admin-orders__modal-summary-row'>
                <span>Status:</span>
                <span className={`admin-orders__status ${getStatusClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
              <div className='admin-orders__modal-summary-row'>
                <span>Payment:</span>
                <span>{selectedOrder.paymentStatus}</span>
              </div>
              {selectedOrder.notes && (
                <div className='admin-orders__modal-summary-row'>
                  <span>Notes:</span>
                  <span>{selectedOrder.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;