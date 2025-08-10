import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout.component';
import Home from './routes/home/home.component';
import './App.css';







const App=() => {
  return (
    <div className="App">
     <Routes>
      {/* Layout is the parent for all pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
        {/* Optional catch-all for 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
    </div>
  );
}

export default App;
