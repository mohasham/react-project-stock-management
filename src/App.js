import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserSession } from './store/user/user.reducer';
import { checkAdminSession } from './store/admin/admin.reducer';
import { selectCurrentAdmin } from './store/admin/admin.selector';
import Layout from './components/layout/layout.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import AuthCallback from './routes/auth-callback/auth-callback.component';
import Features from './routes/features/features.component';
import AdminAuth from './routes/admin-auth/admin-auth.component';
import AdminLayout from './routes/admin/admin-layout/admin-layout.component';
import AdminProtectedRoute from './components/admin-protected-route/admin-protected-route.component';
import AdminDashboard from './routes/admin/admin-dashboard/admin-dashboard.component';
import AdminCategories from './routes/admin/admin-categories/admin-categories.component';
import AdminProducts from './routes/admin/admin-products/admin-products.component';
import AdminOrders from './routes/admin/admin-orders/admin-orders.component';
import AdminCustomers from './routes/admin/admin-customers/admin-customers.component';
import AdminCreateAdmin from './routes/admin/admin-create-admin/admin-create-admin.component';
import Spinner from './components/spinner/spinner.component'; // ✅ add this
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const currentAdmin = useSelector(selectCurrentAdmin);
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    dispatch(checkUserSession());
    dispatch(checkAdminSession());
    setTimeout(() => setSessionChecked(true), 500);
  }, []);

  // ✅ show spinner while sessions are being restored
  if (!sessionChecked) return <Spinner />;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          currentAdmin ? <Navigate to="/admin" /> : <Layout />
        }>
          <Route index element={<Home />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="auth/callback" element={<AuthCallback />} />
          <Route path="auth/admin-login" element={<AdminAuth />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="features" element={<Features />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="create-admin" element={<AdminCreateAdmin />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;