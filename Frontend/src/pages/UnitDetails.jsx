import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, Home, DollarSign, Heart, Star, Mail, Phone, Info } from 'lucide-react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

const UnitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await api.get(`/Unit/${id}`);
        if (response.data && response.data.id) {
          setUnit(response.data);
        } else {
          throw new Error("Empty data");
        }
      } catch (err) {
        console.warn("Using mock data for unit", id);
        setUnit({ 
          id, 
          type: 'Phòng trọ cao cấp', 
          price: 3500000, 
          city: 'Quận 7, TP. Hồ Chí Minh', 
          street: 'Số 15 Đường số 4, Phường Tân Kiểng', 
          area: 30, 
          description: 'Phòng trọ mới xây 100%, phong cách Studio hiện đại. \n- Đầy đủ nội thất: Giường, nệm, tủ quần áo, bàn làm việc.\n- Tiện ích: Máy lạnh, tủ lạnh, máy giặt riêng.\n- An ninh: Khóa vân tay, camera 24/7, không chung chủ.\n- Vị trí: Gần Lotte Mart, ĐH Tôn Đức Thắng, ĐH RMIT.',
          status: 'Còn trống',
          electricityNum: '3.500đ/kwh',
          waterNum: '100.000đ/người',
          image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
          image2: 'https://images.unsplash.com/photo-1502672260266-1c1c2f156269?auto=format&fit=crop&w=1000&q=80',
          image3: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80',
          ownerName: 'Nguyễn Văn A',
          ownerPhone: '0901 234 567'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUnitDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="ud-loading">Đang tải thông tin...</div>;
  if (!unit) return <div className="ud-error">Không tìm thấy thông tin phòng này.</div>;

  const images = [unit.image1, unit.image2, unit.image3].filter(Boolean);

  return (
    <div className="ud">
      <div className="container">
        <div className="ud-top-bar">
          <div className="ud-breadcrumb">
            <Link to="/">Trang chủ</Link> / <Link to="/phong-tro">Phòng trọ</Link> / <span>Chi tiết</span>
          </div>
          <div className="ud-actions">
            <button className="ud-action-btn" onClick={() => setIsLiked(!isLiked)}>
              <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} /> 
              {isLiked ? 'Đã lưu' : 'Lưu tin'}
            </button>
          </div>
        </div>

        <div className="ud-gallery">
          <div className="ud-gallery__main">
            <img src={images[0] || 'https://via.placeholder.com/800x500'} alt="Main" />
          </div>
          <div className="ud-gallery__side">
            {images.slice(1, 3).map((img, i) => (
              <div key={i} className="ud-gallery__thumb">
                <img src={img} alt={`Thumb ${i}`} />
              </div>
            ))}
            {images.length < 2 && <div className="ud-gallery__placeholder">Ảnh đang cập nhật</div>}
          </div>
        </div>

        <div className="ud-content-grid">
          <div className="ud-main-info">
            <div className="ud-badge-row">
              <span className="ud-tag">{unit.type}</span>
              <span className="ud-status-badge"><Info size={14} /> Tin đã xác thực</span>
            </div>
            
            <h1 className="ud-title">{unit.street}</h1>
            <div className="ud-location">
              <MapPin size={18} /> <span>{unit.city}</span>
            </div>

            <div className="ud-stats-bar">
              <div className="ud-stat">
                <span className="ud-stat__label">Mức giá</span>
                <span className="ud-stat__value">{(unit.price || 0).toLocaleString('vi-VN')} đ/tháng</span>
              </div>
              <div className="ud-stat">
                <span className="ud-stat__label">Diện tích</span>
                <span className="ud-stat__value">{unit.area || 0} m²</span>
              </div>
              <div className="ud-stat">
                <span className="ud-stat__label">Trạng thái</span>
                <span className="ud-stat__value text-success">{unit.status || 'Còn trống'}</span>
              </div>
            </div>

            <div className="ud-section">
              <h2 className="ud-section__title">Đặc điểm bất động sản</h2>
              <div className="ud-specs-grid">
                <div className="ud-spec-item"><Bed size={20} /> <span>1 Phòng ngủ</span></div>
                <div className="ud-spec-item"><Bath size={20} /> <span>1 Phòng tắm</span></div>
                <div className="ud-spec-item"><Square size={20} /> <span>Tầng cao thoáng</span></div>
                <div className="ud-spec-item"><Home size={20} /> <span>Có ban công</span></div>
              </div>
            </div>

            <div className="ud-section">
              <h2 className="ud-section__title">Thông tin mô tả</h2>
              <div className="ud-description">{unit.description}</div>
            </div>

            <div className="ud-section">
              <h2 className="ud-section__title">Chi phí khác</h2>
              <div className="ud-costs-grid">
                <div className="ud-cost-card">
                  <span className="ud-cost-label">Tiền điện</span>
                  <span className="ud-cost-value">{unit.electricityNum || 'Theo giá nhà nước'}</span>
                </div>
                <div className="ud-cost-card">
                  <span className="ud-cost-label">Tiền nước</span>
                  <span className="ud-cost-value">{unit.waterNum || 'Theo giá nhà nước'}</span>
                </div>
                <div className="ud-cost-card">
                  <span className="ud-cost-label">Phí dịch vụ</span>
                  <span className="ud-cost-value">Miễn phí</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="ud-sidebar">
            <div className="ud-owner-card">
              <div className="ud-owner__info">
                <div className="ud-owner__avatar">
                  {unit.ownerName?.charAt(0) || 'U'}
                </div>
                <div>
                  <h3 className="ud-owner__name">{unit.ownerName || 'Chủ phòng trọ'}</h3>
                  <p className="ud-owner__status">Đang hoạt động</p>
                </div>
              </div>

              <div className="ud-owner__actions">
                <button className="btn btn-primary w-full ud-btn-phone" onClick={() => setShowPhone(true)}>
                  <Phone size={18} /> {showPhone ? (unit.ownerPhone || '0901 234 567') : 'Bấm để hiện số'}
                </button>
                <button className="btn btn-outline w-full ud-btn-zalo" onClick={() => window.open(`https://zalo.me/${(unit.ownerPhone || '0901234567').replace(/\s/g, '')}`, '_blank')}>
                  Chat qua Zalo
                </button>
              </div>
            </div>

            <div className="ud-tips-card">
              <h4>Lưu ý an toàn</h4>
              <ul>
                <li>Không nên đặt cọc tiền trước khi xem phòng.</li>
                <li>Kiểm tra kỹ hợp đồng thuê nhà.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .ud { background: #f8fafc; min-height: 100vh; padding-bottom: 80px; }
        .ud-loading, .ud-error { padding: 150px; text-align: center; font-size: 18px; color: #64748b; }
        
        .ud-top-bar { padding: 100px 0 20px; display: flex; justify-content: space-between; align-items: center; }
        .ud-breadcrumb { font-size: 13px; color: #64748b; }
        .ud-breadcrumb a { color: #1e62d0; }
        .ud-actions { display: flex; gap: 15px; }
        .ud-action-btn { display: flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #475569; padding: 8px 12px; border-radius: 8px; transition: 0.2s; }
        .ud-action-btn:hover { background: #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }

        .ud-gallery { display: grid; grid-template-columns: 2fr 1fr; gap: 15px; height: 450px; margin-bottom: 30px; }
        .ud-gallery img { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; }
        .ud-gallery__side { display: grid; grid-template-rows: 1fr 1fr; gap: 15px; }
        .ud-gallery__placeholder { background: #e2e8f0; border-radius: 12px; display: grid; place-items: center; color: #94a3b8; font-weight: 600; font-size: 14px; }

        .ud-content-grid { display: grid; grid-template-columns: 1fr 350px; gap: 40px; align-items: flex-start; }
        
        .ud-main-info { background: white; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; }
        .ud-badge-row { display: flex; gap: 12px; margin-bottom: 15px; }
        .ud-tag { background: #eff6ff; color: #1e62d0; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; }
        .ud-status-badge { display: flex; align-items: center; gap: 4px; color: #10b981; font-size: 12px; font-weight: 700; }
        
        .ud-title { font-size: 28px; font-weight: 800; color: #1e293b; margin-bottom: 12px; line-height: 1.3; }
        .ud-location { display: flex; align-items: center; gap: 6px; color: #64748b; font-size: 15px; margin-bottom: 25px; }
        
        .ud-stats-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; background: #f8fafc; border-radius: 12px; margin-bottom: 30px; }
        .ud-stat { display: flex; flex-direction: column; gap: 4px; }
        .ud-stat__label { font-size: 12px; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
        .ud-stat__value { font-size: 18px; font-weight: 800; color: #1e293b; }
        .text-success { color: #10b981; }

        .ud-section { margin-bottom: 35px; }
        .ud-section__title { font-size: 18px; font-weight: 700; color: #1e293b; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #f1f5f9; }
        
        .ud-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .ud-spec-item { display: flex; align-items: center; gap: 12px; color: #475569; font-weight: 500; }
        
        .ud-description { color: #475569; line-height: 1.8; white-space: pre-line; font-size: 15px; }
        
        .ud-costs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
        .ud-cost-card { padding: 15px; border-radius: 10px; border: 1px solid #f1f5f9; text-align: center; }
        .ud-cost-label { display: block; font-size: 12px; color: #94a3b8; margin-bottom: 5px; }
        .ud-cost-value { font-weight: 700; color: #1e293b; }

        .ud-sidebar { position: sticky; top: 100px; display: flex; flex-direction: column; gap: 20px; }
        .ud-owner-card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .ud-owner__info { display: flex; align-items: center; gap: 15px; margin-bottom: 25px; }
        .ud-owner__avatar { width: 50px; height: 50px; border-radius: 50%; background: #1e62d0; color: white; display: grid; place-items: center; font-size: 20px; font-weight: 700; }
        .ud-owner__name { font-size: 16px; font-weight: 700; color: #1e293b; }
        .ud-owner__status { font-size: 12px; color: #10b981; font-weight: 600; }
        
        .ud-owner__actions { display: flex; flex-direction: column; gap: 12px; }
        .ud-btn-phone { height: 48px; font-size: 16px; background: #10b981; }
        .ud-btn-phone:hover { background: #059669; }
        .ud-btn-zalo { height: 48px; font-size: 16px; color: #1e62d0; border-color: #1e62d0; }

        .ud-tips-card { background: #fffbeb; padding: 20px; border-radius: 12px; border: 1px solid #fef3c7; }
        .ud-tips-card h4 { font-size: 14px; font-weight: 700; color: #92400e; margin-bottom: 12px; }
        .ud-tips-card ul { padding-left: 20px; font-size: 13px; color: #92400e; display: flex; flex-direction: column; gap: 8px; }

        @media (max-width: 992px) {
          .ud-content-grid { grid-template-columns: 1fr; }
          .ud-gallery { height: 300px; }
        }
      `}</style>
    </div>
  );
};

export default UnitDetails;
