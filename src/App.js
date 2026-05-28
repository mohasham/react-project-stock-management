import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserSession } from './store/user/user.reducer';
import { checkAdminSession } from './store/admin/admin.reducer';
import Layout from './components/layout/layout.component';
import Home from './routes/home/home.component';
import Shop from './routes/shop/shop.component';
import Authentication from './routes/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';
import AuthCallback from './routes/auth-callback/auth-callback.component';
import AdminAuth from './routes/admin-auth/admin-auth.component';
import './App.css';







const App=() => {
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(checkUserSession());
  dispatch(checkAdminSession()); 
  }, []);
  return (
    <div className="App">
     <Routes>
      {/* Layout is the parent for all pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="auth/callback" element={<AuthCallback />} /> 
        <Route path="checkout" element={<Checkout />} /> 
        {/* Admin Routes */}
        <Route path="auth/admin-login" element={<AdminAuth />} />
        {/* Optional catch-all for 404
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
    </div>
  );
}

export default App;
