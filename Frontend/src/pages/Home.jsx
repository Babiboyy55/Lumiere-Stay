import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, ArrowRight, Home, Hotel, Mail, Phone } from 'lucide-react';
import api from '../api/api';
import UnitCard from '../components/UnitCard';

const CATEGORIES = [
  { label: 'Tất cả',          icon: <Search size={15} /> },
  { label: 'Phòng trọ',       icon: <Home size={15} /> },
  { label: 'Nhà nguyên căn',  icon: <Home size={15} /> },
  { label: 'Căn hộ',          icon: <Hotel size={15} /> },
  { label: 'Ký túc xá',       icon: <Home size={15} /> },
];

const CITY_DATA = [
  { name: 'Hồ Chí Minh', img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=400&q=80' },
  { name: 'Hà Nội',      img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80' },
  { name: 'Đà Nẵng',     img: 'https://images.unsplash.com/photo-1559592442-74196b49705d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Bình Dương',  img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=400&q=80' },
];

const MOCK_UNITS = [
  { id: 1, type: 'Căn hộ', price: 6500000, city: 'Quận 1, HCM', street: 'Căn hộ studio cao cấp, đầy đủ nội thất, gần trung tâm', area: 35, image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: 2, type: 'Phòng trọ', price: 3200000, city: 'Cầu Giấy, HN', street: 'Phòng trọ mới xây, có ban công, giờ giấc tự do', area: 25, image1: 'https://images.unsplash.com/photo-1502672260266-1c1c2f156269?auto=format&fit=crop&w=800&q=80' },
  { id: 3, type: 'Nhà nguyên căn', price: 12000000, city: 'Sơn Trà, ĐN', street: 'Nhà nguyên căn 2 tầng, gần biển, phù hợp ở gia đình', area: 80, image1: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80' },
  { id: 4, type: 'Ký túc xá', price: 1500000, city: 'Thủ Đức, HCM', street: 'Ký túc xá cao cấp, đầy đủ tiện ích, gần Làng Đại Học', area: 10, image1: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    api.get('/Unit')
      .then(r => setUnits(r.data?.length ? r.data : MOCK_UNITS))
      .catch(() => setUnits(MOCK_UNITS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="hp">
      {/* ── HERO SECTION ── */}
      <section className="hp-hero">
        <div className="hp-hero__bg" />
        <div className="container hp-hero__content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hp-hero__title"
          >
            Tìm không gian sống lý tưởng của bạn
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hp-search-card"
          >
            <div className="hp-search__tabs">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.label}
                  className={`hp-search__tab ${activeTab === i ? 'active' : ''}`}
                  onClick={() => setActiveTab(i)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="hp-search__fields">
              <div className="hp-search__group">
                <label>Địa điểm</label>
                <div className="hp-search__input-wrap">
                  <MapPin size={18} />
                  <input 
                    type="text" 
                    placeholder="Thành phố, quận..." 
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </div>
              </div>
              <div className="hp-search__group">
                <label>Mức giá</label>
                <select>
                  <option>Tất cả mức giá</option>
                  <option>Dưới 2 triệu</option>
                  <option>2 - 5 triệu</option>
                  <option>Trên 5 triệu</option>
                </select>
              </div>
              <div className="hp-search__group">
                <label>Diện tích</label>
                <select>
                  <option>Tất cả diện tích</option>
                  <option>Dưới 20 m²</option>
                  <option>20 - 50 m²</option>
                  <option>Trên 50 m²</option>
                </select>
              </div>
              <button className="hp-search__btn">
                <Search size={18} /> Tìm kiếm
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED LISTINGS ── */}
      <section className="container hp-section">
        <div className="hp-section__header">
          <div>
            <h2 className="hp-section__title">Tin đăng nổi bật</h2>
            <p>Khám phá những lựa chọn tốt nhất dành cho bạn</p>
          </div>
          <button className="hp-btn-link" onClick={() => navigate('/tim-tro')}>
            Xem tất cả <ArrowRight size={16} />
          </button>
        </div>

        <div className="hp-grid">
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            units.map((unit, i) => <UnitCard key={unit.id} unit={unit} index={i} />)
          )}
        </div>
      </section>

      {/* ── EXPLORE BY CITIES ── */}
      <section className="hp-cities">
        <div className="container">
          <div className="hp-section__center">
            <h2 className="hp-section__title text-white">Khám phá theo tỉnh thành</h2>
            <p className="text-white-muted">Tìm kiếm phòng trọ tại các thành phố lớn nhất Việt Nam</p>
          </div>

          <div className="hp-cities__filters">
            {['Tất cả', 'Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Huế', 'Bình Dương'].map((city, i) => (
              <button 
                key={city} 
                className={`hp-cities__filter-btn ${i === 0 ? 'active' : ''}`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="hp-city-grid">
            {CITY_DATA.map((city) => (
              <div key={city.name} className="hp-city-card">
                <img src={city.img} alt={city.name} />
                <div className="hp-city-overlay">
                  <h3>{city.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="hp-footer">
        <div className="container hp-footer__grid">
          <div className="hp-footer__brand">
            <h2 className="hp-footer__logo">Trọ<span>Xanh</span></h2>
            <p>© 2024 TrọXanh. Nền tảng tìm kiếm phòng trọ hàng đầu Việt Nam. Chúng tôi kết nối người thuê và chủ trọ một cách nhanh chóng, an toàn và minh bạch.</p>
          </div>
          <div>
            <h3>Về TrọXanh</h3>
            <ul>
              <li>Về chúng tôi</li>
              <li>Tin tức thị trường</li>
              <li>Cơ hội nghề nghiệp</li>
            </ul>
          </div>
          <div>
            <h3>Hỗ trợ</h3>
            <ul>
              <li>Quy định đăng tin</li>
              <li>Chính sách bảo mật</li>
              <li>Liên hệ hỗ trợ</li>
            </ul>
          </div>
          <div>
            <h3>Kết nối</h3>
            <div className="hp-footer__socials">
              <div className="hp-footer__social-circle">FB</div>
              <div className="hp-footer__social-circle">TW</div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .hp-hero {
          position: relative;
          padding: 160px 0 100px;
          min-height: 500px;
          text-align: center;
        }
        .hp-hero__bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, #1e62d0 0%, #10b981 100%);
          z-index: -1;
        }
        .hp-hero__title {
          color: white;
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 40px;
        }
        .hp-search-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          max-width: 900px;
          margin: 0 auto;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .hp-search__tabs {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
          border-bottom: 1px solid #eee;
          padding-bottom: 12px;
        }
        .hp-search__tab {
          font-weight: 600;
          color: #666;
          padding: 8px 16px;
          border-radius: 8px;
        }
        .hp-search__tab.active {
          background: #1e62d0;
          color: white;
        }
        .hp-search__fields {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr auto;
          gap: 16px;
          align-items: flex-end;
          text-align: left;
        }
        .hp-search__group label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #444;
        }
        .hp-search__input-wrap, .hp-search__fields select {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }
        .hp-search__input-wrap input { border: none; background: transparent; width: 100%; outline: none; }
        .hp-search__btn {
          background: #1e62d0;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hp-section { padding: 80px 0; }
        .hp-section__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .hp-section__title { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
        .hp-btn-link { color: #1e62d0; font-weight: 600; display: flex; align-items: center; gap: 4px; }

        .hp-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }

        .hp-cities { background: #333; padding: 80px 0; }
        .hp-section__center { text-align: center; margin-bottom: 30px; }
        .text-white { color: white; }
        .text-white-muted { color: #aaa; margin-bottom: 24px; }
        
        .hp-cities__filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }
        .hp-cities__filter-btn {
          padding: 8px 20px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          color: white;
          font-size: 13px;
          font-weight: 500;
          transition: 0.3s;
        }
        .hp-cities__filter-btn.active {
          background: #1e62d0;
          border-color: #1e62d0;
        }
        .hp-cities__filter-btn:hover:not(.active) {
          background: rgba(255,255,255,0.1);
        }

        .hp-city-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .hp-city-card { position: relative; height: 180px; border-radius: 12px; overflow: hidden; cursor: pointer; }
        .hp-city-card img { width: 100%; height: 100%; object-fit: cover; transition: 0.3s; }
        .hp-city-card:hover img { transform: scale(1.1); }
        .hp-city-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: grid; place-items: center; }
        .hp-city-overlay h3 { color: white; font-size: 18px; font-weight: 700; }

        .hp-footer { background: #f8fafc; padding: 80px 0 40px; border-top: 1px solid #eee; }
        .hp-footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
        .hp-footer__logo { font-size: 24px; font-weight: 800; margin-bottom: 16px; color: #1e62d0; }
        .hp-footer__logo span { color: #10b981; }
        .hp-footer h3 { font-size: 16px; font-weight: 700; margin-bottom: 20px; }
        .hp-footer ul { list-style: none; }
        .hp-footer li { margin-bottom: 12px; color: #666; cursor: pointer; }
        .hp-footer__socials { display: flex; gap: 12px; }
        .hp-footer__social-circle { 
          width: 36px; 
          height: 36px; 
          background: #e0e7ff; 
          color: #1e62d0; 
          border-radius: 50%; 
          display: grid; 
          place-items: center; 
          transition: 0.3s;
        }
        .hp-footer__social-circle:hover {
          background: #1e62d0;
          color: white;
        }

        @media (max-width: 768px) {
          .hp-city-grid, .hp-footer__grid { grid-template-columns: 1fr; }
          .hp-search__fields { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;