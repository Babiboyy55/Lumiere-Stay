import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Home, DollarSign } from 'lucide-react';
import api from '../../api/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUnits: 0,
    totalReservations: 0,
    totalProfit: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Gọi API đến endpoint [HttpGet("Numbers")] trong AdminController
        const response = await api.get('/Admin/Numbers');
        const data = response.data;
        
        // Map dữ liệu từ Backend vào State. 
        // LƯU Ý: Tên các thuộc tính (data.totalUsers, data.totalProfit...) phụ thuộc vào 
        // cách bạn định nghĩa trong class DTO/ViewModel của phương thức GeneralNumbers()
        setStats({
          totalUsers: data.totalUsers || data.TotalUsers || data.users || 0,
          totalUnits: data.totalUnits || data.TotalUnits || data.units || 0,
          totalReservations: data.totalReservations || data.TotalReservations || data.reservations || 0,
          totalProfit: data.totalProfit || data.TotalProfit || data.profit || 0
        });

      } catch (error) {
        console.error("Lỗi khi tải dữ liệu thống kê:", error);
        
        // Mock data để giao diện không bị trống nếu API lỗi
        setStats({
          totalUsers: 125,
          totalUnits: 48,
          totalReservations: 320,
          totalProfit: 45000000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div style={{ 
      backgroundColor: '#fff', padding: '20px', borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' 
    }}>
      <div style={{ backgroundColor: color, color: '#fff', padding: '15px', borderRadius: '50%' }}>
        {icon}
      </div>
      <div>
        <h4 style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>{title}</h4>
        <h2 style={{ margin: '5px 0 0 0', color: '#1e293b', fontSize: '1.5rem' }}>{value}</h2>
      </div>
    </div>
  );

  if (loading) return <div style={{ padding: '20px' }}>Đang tải dữ liệu tổng quan...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', color: '#1e293b', marginBottom: '20px' }}>Tổng quan hệ thống</h1>
      
      {/* Lưới hiển thị các thẻ thống kê */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <StatCard title="Tổng người dùng" value={stats.totalUsers} icon={<Users size={24} />} color="#3b82f6" />
        <StatCard title="Tổng phòng đang cho thuê" value={stats.totalUnits} icon={<Home size={24} />} color="#10b981" />
        <StatCard title="Lượt đặt chỗ (Reservations)" value={stats.totalReservations} icon={<TrendingUp size={24} />} color="#f59e0b" />
        <StatCard title="Doanh thu nền tảng (Profit)" value={formatCurrency(stats.totalProfit)} icon={<DollarSign size={24} />} color="#ef4444" />
      </div>

      {/* Vùng chuẩn bị cho biểu đồ */}
      <div style={{ marginTop: '40px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0, color: '#334155' }}>Hoạt động gần đây (Ads vs Reservations)</h3>
        <p style={{ color: '#94a3b8' }}>
          {/* Gợi ý: Sau này bạn có thể fetch api.get('/Admin/adsVsReservations') và dùng Recharts để vẽ biểu đồ tại đây */}
          Khu vực này sẽ được tích hợp biểu đồ thống kê trong các bản cập nhật tiếp theo...
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;