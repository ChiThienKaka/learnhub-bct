import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Favorite, History } from '../pages';
import LayoutDefault from '../Layout/LayoutDefault';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<LayoutDefault><Favorite /></LayoutDefault>} />
      <Route path="/history" element={<LayoutDefault><History /></LayoutDefault>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
