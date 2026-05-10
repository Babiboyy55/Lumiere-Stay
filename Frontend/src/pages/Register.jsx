import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import api from '../api/api';

const Register = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Renter' // Default to Renter
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));

      // SỬA TẠI ĐÂY: Chỉ cần truyền 'data', Axios sẽ tự động lo phần Header và Boundary một cách hoàn hảo
      const response = await api.post('/Account/Register', data);
      
      if (response.status === 200) {
        if (response.data.onboardingUrl) {
          window.location.href = response.data.onboardingUrl;
        } else {
          alert('Đăng ký thành công! Hãy đăng nhập để tiếp tục.');
          navigate('/login');
        }
      }
    } catch (err) {
      console.error("Register error", err);
      
      let errorMessage = 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.';
      
      // Xử lý hiển thị lỗi mượt mà và bao quát mọi trường hợp từ .NET
      if (err.response?.data) {
        if (err.response.data.errors) {
          // Lỗi do thiếu trường dữ liệu hoặc sai định dạng email,...
          errorMessage = Object.values(err.response.data.errors).flat().join('\n');
        } else if (err.response.data.Errors) {
          // Lỗi do Identity sinh ra (VD: Mật khẩu yếu, Email trùng,...)
          errorMessage = Object.values(err.response.data.Errors).flat().join('\n');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        } else {
          // Fallback cho trường hợp trả về mảng trực tiếp
          errorMessage = Object.values(err.response.data).flat().join('\n');
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '4rem 1rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ 
          width: '100%', 
          maxWidth: '600px', 
          padding: '2.5rem', 
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Tham gia Lumiere</h1>
          <p style={{ color: 'var(--text-muted)' }}>Bắt đầu quản lý hoặc tìm kiếm phòng trọ mơ ước của bạn</p>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
            color: 'var(--error)', 
            borderRadius: 'var(--radius-md)', 
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="md-col">
            <div className="input-group">
              <label className="input-label">Họ</label>
              <input 
                name="firstName"
                type="text" 
                className="input-field" 
                placeholder="Nguyễn"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label className="input-label">Tên</label>
              <input 
                name="lastName"
                type="text" 
                className="input-field" 
                placeholder="Văn An"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Tên đăng nhập</label>
            <input 
              name="userName"
              type="text" 
              className="input-field" 
              placeholder="an_nguyen123"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              name="email"
              type="email" 
              className="input-field" 
              placeholder="an@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Số điện thoại</label>
            <input 
              name="phone"
              type="tel" 
              className="input-field" 
              placeholder="0901234567"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Mật khẩu</label>
            <input 
              name="password"
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Xác nhận mật khẩu</label>
            <input 
              name="confirmPassword"
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Bạn là ai?</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="role" 
                  value="Renter" 
                  checked={formData.role === 'Renter'}
                  onChange={handleChange}
                />
                Người thuê phòng
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="role" 
                  value="Owner" 
                  checked={formData.role === 'Owner'}
                  onChange={handleChange}
                />
                Chủ trọ (Quản lý)
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', marginTop: '1.5rem' }}
            disabled={loading}
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký ngay'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Đã có tài khoản? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '500' }}>Đăng nhập</Link>
        </div>
      </motion.div>
      <style>{`
        @media (max-width: 500px) {
          .md-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Register;
