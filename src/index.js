import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './tailwind.css';
import App from './App';
import Invoice from './Invoice';
import Eway from './EwayBill';
import Shipping from './ShippingBill';
import Mobile from './Mobile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/EwayBill" element={<Eway />} />
        <Route path="/Shipping" element={<Shipping />} />
        <Route path="/Mobile" element={<Mobile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
