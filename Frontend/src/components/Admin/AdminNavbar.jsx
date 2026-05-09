import React from 'react';
import { Bell, User } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <header style={{ 
      height: '64px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' 
    }}>
      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
        Trang quản trị / <span style={{ color: '#1e293b', fontWeight: '500' }}>Dashboard</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
          <Bell size={20} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1e293b' }}>Admin Lumiere</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Quản trị viên hệ thống</div>
          </div>
          <div style={{ 
            width: '36px', height: '36px', backgroundColor: '#e2e8f0', 
            borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' 
          }}>
            <User size={20} color="#64748b" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;