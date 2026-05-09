import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Trash2, Home } from 'lucide-react';
import api from '../../api/api';

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    try {
      // Gọi API lấy danh sách Owner đã có sẵn ở Backend
      const response = await api.get('/Admin/Owners');
      
      const formattedOwners = response.data.map(o => ({
        id: o.id || o.Id,
        fullName: `${o.firstName || ''} ${o.lastName || ''}`.trim() || o.userName,
        email: o.email,
        isActive: o.isActive !== undefined ? o.isActive : true,
        // Dựa vào OwnerDTO của bạn, nếu BE có trả về số lượng phòng/cộng đồng, bạn có thể map ở đây
        // Ví dụ: unitsCount: o.unitsCount || 0
      }));

      setOwners(formattedOwners);
    } catch (error) {
      console.error("Lỗi khi tải danh sách chủ nhà:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const actionName = currentStatus ? 'khóa' : 'mở khóa';
    if (!window.confirm(`Bạn có chắc muốn ${actionName} tài khoản Chủ nhà này? Các bài đăng của họ có thể bị ẩn theo.`)) return;
    
    try {
      await api.put(`/Admin/ToggleStatus/${userId}`);
      setOwners(owners.map(o => o.id === userId ? { ...o, isActive: !currentStatus } : o));
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  };

  const handleDeleteOwner = async (userId) => {
    if (!window.confirm('CẢNH BÁO: Xóa Chủ nhà sẽ ảnh hưởng đến các bất động sản và hóa đơn liên quan. Bạn chắc chắn chứ?')) return;
    
    try {
      await api.delete(`/Admin/Delete/${userId}`);
      setOwners(owners.filter(o => o.id !== userId));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi xóa tài khoản!");
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tải danh sách Chủ nhà...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: '0 0 5px 0' }}>Quản lý Chủ nhà (Owners)</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Quản lý các tài khoản đăng tin cho thuê trên hệ thống</p>
        </div>
        <span style={{ backgroundColor: '#166534', color: '#fff', padding: '8px 16px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Home size={18} /> Tổng: {owners.length} chủ nhà
        </span>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f0fdf4', borderBottom: '2px solid #bbf7d0' }}>
            <tr>
              <th style={{ padding: '15px 20px', color: '#166534', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '15px 20px', color: '#166534', fontWeight: '600' }}>Họ Tên</th>
              <th style={{ padding: '15px 20px', color: '#166534', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '15px 20px', color: '#166534', fontWeight: '600' }}>Trạng thái</th>
              <th style={{ padding: '15px 20px', color: '#166534', fontWeight: '600', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {owners.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  Chưa có chủ nhà nào trên hệ thống
                </td>
              </tr>
            ) : (
              owners.map((owner) => (
                <tr key={owner.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '0.85rem' }}>
                    #{owner.id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '15px 20px', fontWeight: '500', color: '#1e293b' }}>{owner.fullName}</td>
                  <td style={{ padding: '15px 20px', color: '#64748b' }}>{owner.email}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ color: owner.isActive ? '#10b981' : '#ef4444', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {owner.isActive ? <><ShieldCheck size={16}/> Đang hoạt động</> : <><ShieldAlert size={16}/> Đã bị khóa</>}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => handleToggleStatus(owner.id, owner.isActive)}
                      title={owner.isActive ? "Khóa tài khoản" : "Mở khóa"}
                      style={{ 
                        padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '500',
                        backgroundColor: owner.isActive ? '#fee2e2' : '#dcfce7',
                        color: owner.isActive ? '#991b1b' : '#166534'
                      }}
                    >
                      {owner.isActive ? 'Khóa' : 'Mở khóa'}
                    </button>
                    
                    <button 
                      onClick={() => handleDeleteOwner(owner.id)}
                      title="Xóa tài khoản"
                      style={{ padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: '#f1f5f9', color: '#ef4444' }}
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

export default ManageOwners;