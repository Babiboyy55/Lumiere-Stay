import React, { useState, useEffect } from 'react';
import { ShieldAlert, ShieldCheck, Trash2 } from 'lucide-react';
import api from '../../api/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  // 1. LẤY DANH SÁCH NGƯỜI DÙNG
  const fetchUsers = async () => {
    try {
      const response = await api.get('/Admin/Users');
      
      // Xử lý dữ liệu trả về để khớp với bảng
      const formattedUsers = response.data.map(u => ({
        id: u.id || u.Id,
        // Gộp firstName và lastName lại, nếu không có thì dùng userName
        fullName: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.userName,
        email: u.email,
        role: u.role || u.Role || 'Người dùng', // Tùy thuộc vào DTO của bạn trả về chữ hoa hay thường
        isActive: u.isActive !== undefined ? u.isActive : true // Mặc định là true nếu API không trả về
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. KHÓA / MỞ KHÓA TÀI KHOẢN
  const handleToggleStatus = async (userId, currentStatus) => {
    const actionName = currentStatus ? 'khóa' : 'mở khóa';
    if (!window.confirm(`Bạn có chắc muốn ${actionName} tài khoản này?`)) return;
    
    try {
      // Gọi API ToggleStatus vừa tạo ở Backend
      await api.put(`/Admin/ToggleStatus/${userId}`);
      
      // Cập nhật lại giao diện ngay lập tức mà không cần load lại trang
      setUsers(users.map(u => u.id === userId ? { ...u, isActive: !currentStatus } : u));
      
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái!");
    }
  };

  // 3. XÓA TÀI KHOẢN
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('CẢNH BÁO: Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này? Hành động này không thể hoàn tác!')) return;
    
    try {
      // Gọi API Delete vừa tạo ở Backend
      await api.delete(`/Admin/Delete/${userId}`);
      
      // Lọc bỏ user đã xóa ra khỏi danh sách hiển thị
      setUsers(users.filter(u => u.id !== userId));
      
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Có lỗi xảy ra khi xóa tài khoản!");
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Đang tải danh sách người dùng...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '1.5rem', color: '#1e293b', margin: 0 }}>Quản lý Người dùng</h1>
        <span style={{ backgroundColor: '#0f172a', color: '#fff', padding: '8px 16px', borderRadius: '6px' }}>
          Tổng cộng: {users.length} tài khoản
        </span>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600' }}>ID</th>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600' }}>Họ Tên</th>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600' }}>Email</th>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600' }}>Vai trò</th>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600' }}>Trạng thái</th>
              <th style={{ padding: '15px 20px', color: '#475569', fontWeight: '600', textAlign: 'center' }}>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
                  Không có dữ liệu người dùng
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  {/* Cắt ngắn ID nếu quá dài (Guid thường rất dài) */}
                  <td style={{ padding: '15px 20px', color: '#64748b', fontSize: '0.85rem' }}>
                    #{user.id.substring(0, 8)}...
                  </td>
                  <td style={{ padding: '15px 20px', fontWeight: '500', color: '#1e293b' }}>{user.fullName}</td>
                  <td style={{ padding: '15px 20px', color: '#64748b' }}>{user.email}</td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '500',
                      backgroundColor: user.role === 'Owner' ? '#dcfce7' : (user.role === 'Admin' ? '#f3e8ff' : '#e0f2fe'),
                      color: user.role === 'Owner' ? '#166534' : (user.role === 'Admin' ? '#7e22ce' : '#075985')
                    }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px' }}>
                    <span style={{ color: user.isActive ? '#10b981' : '#ef4444', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {user.isActive ? <><ShieldCheck size={16}/> Đang hoạt động</> : <><ShieldAlert size={16}/> Đã bị khóa</>}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button 
                      onClick={() => handleToggleStatus(user.id, user.isActive)}
                      title={user.isActive ? "Khóa tài khoản" : "Mở khóa"}
                      style={{ 
                        padding: '6px 12px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: '500',
                        backgroundColor: user.isActive ? '#fee2e2' : '#dcfce7',
                        color: user.isActive ? '#991b1b' : '#166534'
                      }}
                    >
                      {user.isActive ? 'Khóa' : 'Mở khóa'}
                    </button>
                    
                    <button 
                      onClick={() => handleDeleteUser(user.id)}
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

export default ManageUsers;