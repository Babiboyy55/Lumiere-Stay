import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-5'}`} style={isScrolled ? {} : { padding: '1.25rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '1.5rem', color: 'var(--primary)' }}>
          <Home size={28} />
          Lumiere
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'none' }} className="md-flex">
          <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
            <li><Link to="/" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Trang chủ</Link></li>
            <li><Link to="/properties" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Phòng trọ</Link></li>
            <li><Link to="/about" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Giới thiệu</Link></li>
            <li><Link to="/contact" style={{ fontWeight: '500', transition: 'color 0.2s' }}>Liên hệ</Link></li>
          </ul>
        </nav>

        <div style={{ display: 'none', alignItems: 'center', gap: '1rem' }} className="md-flex">
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: '500' }}>Chào, {user.firstName || user.userName}</span>
              <button onClick={logout} className="btn btn-outline">Đăng xuất</button>
            </div>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: '500' }}>Đăng nhập</Link>
              <Link to="/register" className="btn btn-primary">Đăng ký</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md-hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: 'var(--text-main)' }}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md-hidden glass"
            style={{ position: 'absolute', top: '100%', left: 0, width: '100%', padding: '1rem 0', borderTop: '1px solid var(--border)' }}
          >
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Trang chủ</Link>
              <Link to="/properties" onClick={() => setMobileMenuOpen(false)}>Phòng trọ</Link>
              {user ? (
                <>
                  <span>Chào, {user.firstName || user.userName}</span>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="btn btn-outline" style={{ width: '100%' }}>Đăng xuất</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline" style={{ textAlign: 'center' }}>Đăng nhập</Link>
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ textAlign: 'center' }}>Đăng ký</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .md-flex { display: flex !important; }
        .md-hidden { display: none !important; }
        @media (max-width: 768px) {
          .md-flex { display: none !important; }
          .md-hidden { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
