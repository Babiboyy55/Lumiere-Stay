import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, BedDouble, Bath, Square } from 'lucide-react';
import api from '../api/api';

const Home = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // For demonstration, we'll fetch all units if possible, or show mocked data if not logged in
  // The backend seems to require authentication for GetAll according to UnitController
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await api.get('/Unit');
        if (response.data && response.data.length > 0) {
          setUnits(response.data);
        } else {
          throw new Error("Empty list");
        }
      } catch (error) {
        console.log("Using demo data for beautiful presentation");
        setUnits([
          { id: 1, type: 'Căn hộ Studio', price: 3500000, city: 'Cầu Giấy, Hà Nội', street: 'Đường Xuân Thủy', area: 25, image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { id: 2, type: 'Phòng trọ Cao cấp', price: 5000000, city: 'Đống Đa, Hà Nội', street: 'Đường Chùa Bộc', area: 35, image1: 'https://images.unsplash.com/photo-1502672260266-1c1c2f156269?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          { id: 3, type: 'Nhà nguyên căn', price: 15000000, city: 'Hoàn Kiếm, Hà Nội', street: 'Phố Cửa Đông', area: 80, image1: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        minHeight: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        position: 'relative',
        background: 'linear-gradient(135deg, var(--primary-light) 0%, var(--background) 100%)',
        paddingTop: '80px'
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Hệ thống Quản lý <br/><span style={{ color: 'var(--primary)' }}>Nhà trọ Lumiere</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '500px' }}>
              Giải pháp quản lý phòng trọ cao cấp, tiện lợi và thông minh dành cho bạn.
            </p>
            
            {/* Search Box */}
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <Search size={20} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm phòng, vị trí..." 
                  style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', color: 'var(--text-main)' }}
                />
              </div>
              <button className="btn btn-primary">Tìm kiếm</button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md-hidden-img"
            style={{ position: 'relative' }}
          >
            <div style={{ width: '100%', height: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
              {/* Fallback image if cloudinary is not setup yet */}
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Luxury Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: '5rem 0' }} className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Danh sách Phòng trọ</h2>
          <p style={{ color: 'var(--text-muted)' }}>Khám phá các căn phòng tiện nghi và cao cấp của Lumiere</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải dữ liệu...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {units.map((unit, index) => (
              <motion.div 
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/unit/${unit.id}`)}
                style={{ 
                  borderRadius: 'var(--radius-lg)', 
                  overflow: 'hidden', 
                  backgroundColor: 'var(--surface)',
                  boxShadow: 'var(--shadow-md)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ height: '200px', background: '#e2e8f0', position: 'relative' }}>
                  {unit.image1 ? (
                    <img src={unit.image1} alt={unit.type} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Placeholder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500' }}>
                    ${unit.price}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <MapPin size={16} />
                    {unit.street}, {unit.city}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>{unit.type} (Cho thuê)</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Square size={16} /> {unit.area} m²</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><BedDouble size={16} /> 1 Giường</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Bath size={16} /> 1 Phòng tắm</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
      <style>{`
        @media (max-width: 768px) {
          .md-hidden-img { display: none; }
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
