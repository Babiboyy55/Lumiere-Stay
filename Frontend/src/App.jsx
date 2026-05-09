import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

// Import components dùng chung
import Navbar from './components/Navbar';

// Import các trang Public
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UnitDetails from './pages/UnitDetails';
import UnitListing from './pages/UnitListing';

// Import các component Admin
import AdminRoute from './components/Admin/AdminRoute';
import AdminLayout from './components/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageOwners from './pages/Admin/ManageOwners';
import ManageUnits from './pages/Admin/ManageUnits';
import ManageFinances from './pages/Admin/ManageFinances';

// Tạo một Layout riêng cho các trang Public để chứa Navbar
const PublicLayout = () => {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Outlet /> {/* Các trang như Home, Login... sẽ được render tại đây */}
      </main>
    </div>
  );
};

function App() {
  return (
    <Routes>
      {/* =========================================
          1. PUBLIC ROUTES (Có Navbar ở trên)
          ========================================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/phong-tro" element={<UnitListing />} />
        <Route path="/unit/:id" element={<UnitDetails />} />
      </Route>

      {/* =========================================
          2. PROTECTED ADMIN ROUTES (Dùng AdminLayout riêng)
          ========================================= */}
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/owners" element={<ManageOwners />} />
          <Route path="/admin/units" element={<ManageUnits />} />
          <Route path="/admin/finances" element={<ManageFinances />} />
          {/* Thêm các route admin khác tại đây sau này */}
        </Route>
      </Route>

      {/* =========================================
          3. 404 NOT FOUND
          ========================================= */}
      <Route path="*" element={
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>404 - Không tìm thấy trang</h2>
        </div>
      } />
    </Routes>
  );
}

export default App;