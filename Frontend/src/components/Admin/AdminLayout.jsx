import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Thanh Menu bên trái */}
      <AdminSidebar />

      {/* Khu vực nội dung bên phải */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AdminNavbar />
        <main style={{ padding: '20px', flex: 1 }}>
          <Outlet /> {/* Nơi các trang như Dashboard, ManageUsers... sẽ hiển thị */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;