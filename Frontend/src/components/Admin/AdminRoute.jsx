import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Điều chỉnh đường dẫn tùy file của bạn

const AdminRoute = () => {
  // Lấy thông tin user từ AuthContext (giả định theo file AuthContext.jsx của bạn)
  const { user, loading } = useAuth();

  console.log("Current User:", user);

  // Nếu đang trong quá trình xác thực token, hiển thị trạng thái chờ
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Đang xác thực quyền truy cập...</h2>
      </div>
    );
  }

  if (false) { // Tạm thời không chặn ai cả
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ, cho phép render các route con (Layout và các trang Admin)
  return <Outlet />;
};

export default AdminRoute;