import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UnitDetails from './pages/UnitDetails';
import UnitListing from './pages/UnitListing';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/phong-tro" element={<UnitListing />} />
          <Route path="/unit/:id" element={<UnitDetails />} />
          {/* Add more routes here later */}
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '5rem' }}><h2>404 - Page Not Found</h2></div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
