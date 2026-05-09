import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Gọi hàm login từ AuthContext
    const result = await login(email, password);
    
    if (result.success) {
      // KIỂM TRA ROLE: Tùy thuộc vào cấu trúc object user của bạn lưu trong AuthContext
      // Thường nó sẽ nằm ở result.role, result.userData.role, hoặc result.user.role
      const userRole = result.role || (result.user && result.user.role);

      if (userRole === 'Admin') {
        navigate('/admin'); // Đưa Admin vào trang quản trị
      } else {
        navigate('/'); // Người dùng bình thường về trang chủ
      }
    } else {
      // Hiển thị lỗi từ Backend hoặc AuthContext
      setError(result.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--background)',
      padding: '2rem 1rem'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass"
        style={{ 
          width: '100%', 
          maxWidth: '450px', 
          padding: '2.5rem', 
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Chào mừng trở lại</h1>
          <p style={{ color: 'var(--text-muted)' }}>Đăng nhập để vào hệ thống quản lý Lumiere</p>
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
          <div className="input-group">
            <label className="input-label" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="input-field" 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group" style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="input-label" htmlFor="password">Mật khẩu</label>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>Quên mật khẩu?</a>
            </div>
            <input 
              id="password"
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.875rem' }}
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Chưa có tài khoản? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '500' }}>Đăng ký ngay</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
