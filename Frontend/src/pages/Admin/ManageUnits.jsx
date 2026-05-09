import React, { useState, useEffect } from 'react';
import { Trash2, Eye, MapPin, CheckCircle, XCircle } from 'lucide-react';
import api from '../../api/api';

const ManageUnits = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      // Gọi API lấy danh sách bài đăng từ UnitController
      const response = await api.get('/Unit');
      
      const formattedUnits = response.data.map(u => ({
        id: u.id || u.Id,
        title: u.title || u.Title || u.street || 'Chưa có tiêu đề',
        type: u.type || u.Type || 'Phòng trọ',
        price: u.price || u.Price || 0,
        city: u.city || u.City || 'Chưa cập nhật',
        // Giả sử có trường trạng thái duyệt bài, nếu không có thì mặc định là true
        isApproved: u.isApproved !== undefined ? u.isApproved : true, 
        ownerName: u.ownerName || 'Chủ nhà', // Dữ liệu chủ nhà nếu Backend có Join bảng
      }));

      setUnits(formattedUnits);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài đăng:", error);
      // Dữ liệu mẫu (Mock data) nếu API lỗi
      setUnits([
        { id: 1, title: 'Nhà Trọ Bảo Dung Tại Đường Bùi Thị Xuân', type: 'Phòng trọ', price: 2800000, city: 'Hồ Chí Minh', isApproved: true, ownerName: 'Trần Thị B' },
        { id: 2, title: 'KTX MINI DUPLEX – Mặt Tiền Lũy Bán Bích', type: 'Ký túc xá', price: 1700000, city: 'Hồ Chí Minh', isApproved: true, ownerName: 'Nguyễn Văn A' },
        { id: 3, title: 'Nhà nguyên căn 2 tầng, gần biển', type: 'Nhà nguyên căn', price: 12000000, city: 'Đà Nẵng', isApproved: false, ownerName: 'Lê Văn C' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleToggleApproval = async (unitId, currentStatus) => {
    const action = currentStatus ? 'ẩn' : 'duyệt hiển thị';
    if (!window.confirm(`Bạn có chắc muốn ${action} bài đăng này?`)) return;

    try {
      // API giả định: Cần viết thêm endpoint này bên C# UnitController nếu chưa có
      // await api.put(`/Unit/ToggleStatus/${unitId}`);
      
      setUnits(units.map(u => u.id === unitId ? { ...u, isApproved: !currentStatus } : u));
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái bài đăng!");
    }
  };

  const handleDeleteUnit = async (unitId) => {
    if (!window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa bài đăng này?')) return;

    try {
      // Gọi API xóa bài đăng (Hãy chắc chắn UnitController có hàm [HttpDelete("{id}")])
      // await api.delete(`/Unit/${unitId}`);
      
      setUnits(units.filter(u => u.id !== unitId));
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa bài đăng!");
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tải danh sách bài đăng...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: '0 0 5px 0' }}>Quản lý Bài đăng (Units)</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Duyệt, ẩn và quản lý danh sách phòng cho thuê</p>
        </div>
        <span style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px', borderRadius: '6px' }}>
          Tổng: {units.length} bài đăng
        </span>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f0f9ff', borderBottom: '2px solid #bae6fd' }}>
            <tr>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', width: '5%' }}>ID</th>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', width: '30%' }}>Tiêu đề</th>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', width: '15%' }}>Mức giá</th>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', width: '15%' }}>Khu vực</th>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', width: '15%' }}>Trạng thái</th>
              <th style={{ padding: '15px 20px', color: '#0369a1', fontWeight: '600', textAlign: 'center', width: '20%' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {units.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  Chưa có bài đăng nào trên hệ thống
                </td>
              </tr>
            ) : (
              units.map((unit) => (
                <tr key={unit.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '0.85rem' }}>
                    #{unit.id.toString().substring(0, 4)}
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <div style={{ fontWeight: '500', color: '#1e293b', marginBottom: '4px' }}>{unit.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Loại: {unit.type} | Chủ: {unit.ownerName}</div>
                  </td>
                  <td style={{ padding: '15px 20px', fontWeight: '600', color: '#059669' }}>
                    {formatPrice(unit.price)}
                  </td>
                  <td style={{ padding: '15px 20px', color: '#64748b' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={14} /> {unit.city}
                    </div>
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '4px',
                      backgroundColor: unit.isApproved ? '#dcfce7' : '#fee2e2',
                      color: unit.isApproved ? '#166534' : '#991b1b'
                    }}>
                      {unit.isApproved ? <><CheckCircle size={14}/> Đã duyệt</> : <><XCircle size={14}/> Đang ẩn</>}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <button 
                      title="Xem chi tiết"
                      style={{ padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: '#f1f5f9', color: '#3b82f6' }}
                    >
                      <Eye size={18} />
                    </button>
                    
                    <button 
                      onClick={() => handleToggleApproval(unit.id, unit.isApproved)}
                      title={unit.isApproved ? "Ẩn bài viết" : "Duyệt bài"}
                      style={{ padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '500', backgroundColor: '#f1f5f9', color: '#475569' }}
                    >
                      {unit.isApproved ? 'Ẩn' : 'Duyệt'}
                    </button>

                    <button 
                      onClick={() => handleDeleteUnit(unit.id)}
                      title="Xóa bài đăng"
                      style={{ padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: '#fee2e2', color: '#ef4444' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUnits;