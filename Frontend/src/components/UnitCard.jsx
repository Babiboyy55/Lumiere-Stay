import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Square, Heart, Star, Bed, Bath } from 'lucide-react';

const UnitCard = ({ unit, index = 0 }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = React.useState(false);

  if (!unit) return null;

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ/tháng';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="uc-card"
      onClick={() => navigate(`/unit/${unit.id}`)}
    >
      <div className="uc-card__media">
        <img src={unit.image1 || 'https://via.placeholder.com/400x300'} alt={unit.type || 'Phòng trọ'} />
        <span className="uc-card__badge-hot">HOT</span>
        <button 
          className={`uc-card__like ${liked ? 'liked' : ''}`}
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        >
          <Heart size={16} fill={liked ? '#ef4444' : 'none'} />
        </button>
        <div className="uc-card__rating">
          <Star size={12} fill="#fbbf24" color="#fbbf24" />
          <span>4.8</span>
        </div>
      </div>

      <div className="uc-card__body">
        <div className="uc-card__meta">
          <span className="uc-card__tag">{unit.type || 'Phòng trọ'}</span>
          <div className="uc-card__location">
            <MapPin size={12} />
            <span>{unit.city || 'Chưa cập nhật'}</span>
          </div>
        </div>
        <h3 className="uc-card__title">{unit.street || 'Thông tin chi tiết đang cập nhật'}</h3>
        <div className="uc-card__price">{formatPrice(unit.price)}</div>
        <div className="uc-card__specs">
          <div className="uc-card__spec"><Square size={14} /> {unit.area || 0}m²</div>
          <div className="uc-card__spec"><Bed size={14} /> 1 PN</div>
          <div className="uc-card__spec"><Bath size={14} /> 1 WC</div>
        </div>
      </div>

      <style>{`
        .uc-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          transition: 0.3s;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .uc-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .uc-card__media {
          position: relative;
          height: 180px;
          background: #f8fafc;
        }
        .uc-card__media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .uc-card__badge-hot {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #f59e0b;
          color: white;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }
        .uc-card__like {
          position: absolute;
          top: 10px;
          right: 10px;
          background: white;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          z-index: 2;
        }
        .uc-card__rating {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0,0,0,0.6);
          color: white;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
        }
        .uc-card__body {
          padding: 16px;
          flex-grow: 1;
        }
        .uc-card__meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .uc-card__tag {
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          color: #64748b;
          font-weight: 600;
        }
        .uc-card__location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #64748b;
        }
        .uc-card__title {
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #1e293b;
          line-height: 1.4;
          height: 42px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .uc-card__price {
          color: #1e62d0;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .uc-card__specs {
          display: flex;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }
        .uc-card__spec {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #64748b;
        }
      `}</style>
    </motion.div>
  );
};

export default UnitCard;
