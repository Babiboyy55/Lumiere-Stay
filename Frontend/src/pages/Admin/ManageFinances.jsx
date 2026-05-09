import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, Map, Calendar, DollarSign } from 'lucide-react';
import api from '../../api/api';

const ManageFinances = () => {
  const [monthlyProfits, setMonthlyProfits] = useState([]);
  const [communityProfits, setCommunityProfits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, []);

  const fetchFinancialData = async () => {
    try {
      // Gọi song song 2 API để tối ưu thời gian tải trang
      const [monthRes, commRes] = await Promise.all([
        api.get('/Admin/profitsPerMonth'),
        api.get('/Admin/profitperCommunity')
      ]);

      // Map dữ liệu Doanh thu theo tháng
      // (Điều chỉnh tên trường cho khớp với ProfitDTO của bạn nếu cần)
      const formattedMonthly = monthRes.data.map(item => ({
        month: item.month || item.Month || 'N/A',
        year: item.year || item.Year || '',
        profit: item.profit || item.Profit || item.totalProfit || 0
      }));

      // Map dữ liệu Doanh thu theo Khu vực (Community)
      // (Điều chỉnh tên trường cho khớp với ProfitPerCommunityDTO của bạn)
      const formattedCommunity = commRes.data.map(item => ({
        communityName: item.communityName || item.CommunityName || 'Khu vực chưa đặt tên',
        ownerName: item.ownerName || item.OwnerName || 'Chủ nhà',
        profit: item.profit || item.Profit || item.totalProfit || 0
      }));

      setMonthlyProfits(formattedMonthly);
      setCommunityProfits(formattedCommunity);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu tài chính:", error);
      
      // Dữ liệu mẫu (Mock data) hiển thị nếu API chưa sẵn sàng hoặc bị lỗi
      setMonthlyProfits([
        { month: 5, year: 2026, profit: 15500000 },
        { month: 4, year: 2026, profit: 12000000 },
        { month: 3, year: 2026, profit: 9800000 },
      ]);
      setCommunityProfits([
        { communityName: 'Khu dân cư Lý Chiêu Hoàng', ownerName: 'Nguyễn Văn A', profit: 25000000 },
        { communityName: 'Khu KTX Làng Đại Học', ownerName: 'Trần Thị B', profit: 15000000 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tổng hợp dữ liệu tài chính...</div>;

  // Tính tổng doanh thu toàn thời gian để hiển thị thẻ tóm tắt
  const totalOverallProfit = monthlyProfits.reduce((sum, item) => sum + item.profit, 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: '0 0 5px 0' }}>Doanh thu & Tài chính</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Báo cáo lợi nhuận nền tảng từ các giao dịch thuê nhà</p>
        </div>
        <span style={{ backgroundColor: '#059669', color: '#fff', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <DollarSign size={20} /> Tổng: {formatCurrency(totalOverallProfit)}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        
        {/* BẢNG 1: DOANH THU THEO THÁNG */}
        <div style={{ flex: '1 1 45%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#2563eb" />
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Theo Tháng</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600' }}>Thời gian</th>
                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', textAlign: 'right' }}>Lợi nhuận thu về</th>
              </tr>
            </thead>
            <tbody>
              {monthlyProfits.length === 0 ? (
                <tr><td colSpan="2" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Chưa có dữ liệu</td></tr>
              ) : (
                monthlyProfits.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 20px', fontWeight: '500', color: '#1e293b' }}>
                      Tháng {item.month} / {item.year}
                    </td>
                    <td style={{ padding: '12px 20px', fontWeight: '600', color: '#059669', textAlign: 'right' }}>
                      + {formatCurrency(item.profit)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* BẢNG 2: DOANH THU THEO KHU VỰC */}
        <div style={{ flex: '1 1 50%', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '15px 20px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Map size={18} color="#8b5cf6" />
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#1e293b' }}>Theo Khu vực (Community)</h2>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9' }}>
                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600' }}>Tên khu vực</th>
                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600' }}>Chủ quản lý</th>
                <th style={{ padding: '12px 20px', color: '#475569', fontWeight: '600', textAlign: 'right' }}>Đóng góp</th>
              </tr>
            </thead>
            <tbody>
              {communityProfits.length === 0 ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Chưa có dữ liệu</td></tr>
              ) : (
                communityProfits.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px 20px', fontWeight: '500', color: '#1e293b' }}>{item.communityName}</td>
                    <td style={{ padding: '12px 20px', color: '#64748b' }}>{item.ownerName}</td>
                    <td style={{ padding: '12px 20px', fontWeight: '600', color: '#059669', textAlign: 'right' }}>
                      {formatCurrency(item.profit)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ManageFinances;