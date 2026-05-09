import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserCircle, Home, 
  Calendar, CreditCard, MessageSquare, Settings, LogOut 
} from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/users', icon: <Users size={20} />, label: 'Quản lý người dùng' },
    { path: '/admin/owners', icon: <UserCircle size={20} />, label: 'Quản lý chủ nhà' },
    { path: '/admin/units', icon: <Home size={20} />, label: 'Quản lý bài đăng' },
    { path: '/admin/appointments', icon: <Calendar size={20} />, label: 'Lịch hẹn xem nhà' },
    { path: '/admin/finances', icon: <CreditCard size={20} />, label: 'Doanh thu & Tài chính' },
    { path: '/admin/community', icon: <MessageSquare size={20} />, label: 'Bài viết cộng đồng' },
  ];

  return (
    <div style={{ 
      width: '260px', backgroundColor: '#1e293b', color: '#fff', 
      display: 'flex', flexDirection: 'column', padding: '20px 0' 
    }}>
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #334155', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#38bdf8' }}>Lumiere Admin</h2>
      </div>

      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 20px',
              color: isActive ? '#38bdf8' : '#cbd5e1',
              textDecoration: 'none',
              backgroundColor: isActive ? '#334155' : 'transparent',
              transition: '0.3s'
            })}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid #334155' }}>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '12px', background: 'none', 
          border: 'none', color: '#f87171', cursor: 'pointer', width: '100%' 
        }}>
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;