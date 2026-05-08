import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, Menu, X, ChevronDown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Nhà trọ, phòng trọ', href: '/phong-tro' },
  { label: 'Nhà nguyên căn',     href: '/nha-nguyen-can' },
  { label: 'Căn hộ',             href: '/can-ho' },
  { label: 'Ký túc xá',          href: '/ky-tuc-xa' },
  { label: 'Video Review',        href: '/video-review' },
];

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const close = () => setUserMenuOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [userMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setUserMenuOpen(false);
  };

  return (
    <>
      <header className="lm-navbar" role="banner">
        <div className="container lm-navbar__inner">
          <Link to="/" className="lm-navbar__logo" id="navbar-logo">
            <span style={{ color: 'var(--brand-primary)' }}>Trọ</span>
            <span style={{ color: 'var(--brand-secondary)' }}>Xanh</span>
          </Link>

          <nav className="lm-navbar__links hide-mobile" aria-label="Danh mục chính">
            {NAV_LINKS.map(({ label, href }) => (
              <Link key={href} to={href} className="lm-navbar__link">
                {label}
              </Link>
            ))}
          </nav>

          <div className="lm-navbar__actions hide-mobile">
            {user ? (
              <div className="lm-navbar__user" onClick={e => { e.stopPropagation(); setUserMenuOpen(v => !v); }}>
                <div className="lm-navbar__avatar" id="user-avatar-btn">
                  <User size={16} />
                </div>
                <span className="lm-navbar__username">{user.firstName || user.userName}</span>
                <ChevronDown size={14} className={userMenuOpen ? 'rotated' : ''} />

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: .97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: .97 }}
                      transition={{ duration: .15 }}
                      className="lm-navbar__dropdown"
                    >
                      <button onClick={handleLogout} id="logout-btn">
                        Đăng xuất
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost btn--sm" id="login-btn">Đăng nhập</Link>
                <Link to="/register" className="btn btn-ghost btn--sm" id="register-btn">Đăng ký</Link>
              </>
            )}
            <Link to="/dang-tin" className="btn btn-primary btn--sm" id="post-property-btn" style={{ borderRadius: '20px' }}>
              Đăng tin
            </Link>
          </div>

          <button
            className="lm-navbar__mobile-toggle show-mobile"
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Mở menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lm-navbar__mobile-menu"
            >
              <div className="container lm-navbar__mobile-inner">
                {NAV_LINKS.map(({ label, href }) => (
                  <Link key={href} to={href} onClick={() => setMobileOpen(false)} className="lm-navbar__mobile-link">
                    {label}
                  </Link>
                ))}
                <div className="lm-navbar__mobile-actions">
                  {user ? (
                    <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%' }}>
                      Đăng xuất
                    </button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setMobileOpen(false)} className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>Đăng nhập</Link>
                      <Link to="/register" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Đăng ký</Link>
                    </>
                  )}
                </div>
                <Link to="/dang-tin" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>
                  Đăng tin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <style>{`
        .lm-navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          padding: 12px 0;
          background: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .lm-navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .lm-navbar__logo {
          display: flex;
          align-items: center;
          gap: 2px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 24px;
        }
        .lm-navbar__links {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
          justify-content: center;
        }
        .lm-navbar__link {
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--gray-700);
          transition: 0.2s;
        }
        .lm-navbar__link:hover {
          background: var(--gray-100);
          color: var(--brand-primary);
        }
        .lm-navbar__actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .lm-navbar__user {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          position: relative;
          padding: 6px 12px;
          border-radius: 20px;
          background: var(--gray-100);
          font-size: 14px;
          font-weight: 500;
        }
        .lm-navbar__avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: var(--brand-primary);
          display: grid;
          place-items: center;
          color: #fff;
        }
        .lm-navbar__dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: white;
          border: 1px solid #eee;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 6px;
          min-width: 160px;
          z-index: 100;
        }
        .lm-navbar__dropdown button {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #333;
        }
        .lm-navbar__dropdown button:hover {
          background: #f8fafc;
          color: #ef4444;
        }
        .rotated { transform: rotate(180deg); transition: 0.3s; }
        .lm-navbar__mobile-toggle {
          color: #333;
          padding: 6px;
        }
        .lm-navbar__mobile-menu {
          background: white;
          border-top: 1px solid #eee;
          overflow: hidden;
        }
        .lm-navbar__mobile-inner {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px 20px 20px;
        }
        .lm-navbar__mobile-link {
          padding: 12px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }
        .lm-navbar__mobile-actions {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </>
  );
};

export default Navbar;
