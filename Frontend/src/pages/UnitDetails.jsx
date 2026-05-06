import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, BedDouble, Bath, Square, Home, DollarSign, CheckCircle2, Navigation, Heart, Star, Calendar, MessageSquare } from 'lucide-react';
import api from '../api/api';
import Modal from '../components/Modal';
import { AuthContext } from '../context/AuthContext';

const UnitDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  
  // Modal states
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);

  // Form states
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRate, setReviewRate] = useState(5);
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const fetchUnitDetails = async () => {
      try {
        const response = await api.get(`/Unit/${id}`);
        setUnit(response.data);
        setActiveImage(response.data.image1);
      } catch (err) {
        console.error("Failed to fetch unit details", err);
        const mockUnit = { 
          id, 
          type: 'Phòng trọ cao cấp', 
          price: 3500000, 
          city: 'Cầu Giấy, Hà Nội', 
          street: 'Số 10 Đường Xuân Thủy, Dịch Vọng Hậu', 
          area: 30, 
          description: 'Phòng trọ mới xây tại trung tâm quận Cầu Giấy, gần các trường đại học Sư Phạm, Báo Chí. Đầy đủ nội thất cơ bản, giờ giấc tự do, an ninh 24/7.',
          status: 'Còn trống',
          electricityNum: '3.500đ/kwh',
          waterNum: '100.000đ/người',
          communityId: 1,
          image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          image2: 'https://images.unsplash.com/photo-1502672260266-1c1c2f156269?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
          image3: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        };
        setUnit(mockUnit);
        setActiveImage(mockUnit.image1);
      } finally {
        setLoading(false);
      }
    };
    fetchUnitDetails();
  }, [id]);

  const handleToggleLike = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thực hiện tính năng này");
      return;
    }
    // Simulate like for now
    setIsLiked(!isLiked);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      // In a real app, you'd fetch available slots first
      // This is a simplified version using the Reservation API
      await api.post('/Reservation', {
        appointmentId: 1, // This should be a dynamic ID from a slot picker
        name: user?.userName || "Khách",
        email: user?.email || "guest@example.com",
        phoneNumber: "0901234567"
      });
      alert("Đặt lịch thành công! Quản lý sẽ liên hệ với bạn sớm.");
      setShowAppointmentModal(false);
    } catch (err) {
      alert("Có lỗi xảy ra khi đặt lịch.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Chỉ người thuê phòng mới có thể đánh giá");
      return;
    }
    try {
      const formData = new FormData();
      formData.append('content', reviewContent);
      formData.append('rate', reviewRate);
      
      await api.post('/Review', formData);
      alert("Cảm ơn bạn đã đánh giá!");
      setShowReviewModal(false);
      setReviewContent('');
    } catch (err) {
      alert(err.response?.data?.message || "Lỗi khi gửi đánh giá.");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '1.25rem', color: 'var(--primary)' }}>Đang tải thông tin phòng...</div>
      </div>
    );
  }

  if (!unit) return <div style={{ padding: '5rem', textAlign: 'center' }}>Không tìm thấy phòng trọ này.</div>;

  const images = [unit.image1, unit.image2, unit.image3].filter(Boolean);

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
          <Navigation size={16} style={{ transform: 'rotate(-90deg)' }} /> Quay lại danh sách
        </Link>
        <button 
          onClick={handleToggleLike}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.5rem 1rem', 
            borderRadius: 'var(--radius-md)',
            background: isLiked ? 'rgba(239, 68, 68, 0.1)' : 'var(--surface)',
            color: isLiked ? 'var(--error)' : 'var(--text-muted)',
            border: '1px solid ' + (isLiked ? 'var(--error)' : 'var(--border)'),
            transition: 'all 0.2s'
          }}
        >
          <Heart size={20} fill={isLiked ? 'var(--error)' : 'none'} />
          {isLiked ? 'Đã yêu thích' : 'Yêu thích'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '500', marginBottom: '0.5rem' }}>
                <Home size={18} /> {unit.type}
                <span style={{ padding: '0.25rem 0.75rem', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.75rem', marginLeft: '1rem' }}>
                  {unit.status}
                </span>
              </div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{unit.street}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                <MapPin size={18} /> {unit.city}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                {unit.price.toLocaleString('vi-VN')} đ <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ tháng</span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <motion.div 
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%', height: '500px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '1rem', boxShadow: 'var(--shadow-md)' }}
            >
              <img src={activeImage} alt="Phòng trọ" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            
            <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {images.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setActiveImage(img)}
                  style={{ 
                    width: '120px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer',
                    border: activeImage === img ? '3px solid var(--primary)' : '3px solid transparent',
                    opacity: activeImage === img ? 1 : 0.7, transition: 'all 0.2s ease'
                  }}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '3rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Square size={24} color="var(--primary)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Diện tích</span>
              <span style={{ fontWeight: '600' }}>{unit.area} m²</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <BedDouble size={24} color="var(--primary)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phòng ngủ</span>
              <span style={{ fontWeight: '600' }}>1 Giường</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Bath size={24} color="var(--primary)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Phòng tắm</span>
              <span style={{ fontWeight: '600' }}>1 Phòng</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={24} color="var(--accent)" />
              <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Đánh giá</span>
              <span style={{ fontWeight: '600' }}>4.8/5</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }} className="md-col">
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Mô tả chi tiết</h2>
              <p style={{ color: 'var(--text-main)', lineHeight: '1.8', whiteSpace: 'pre-line', marginBottom: '2rem' }}>{unit.description}</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Đánh giá từ người thuê</h2>
                <button onClick={() => setShowReviewModal(true)} style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                  <MessageSquare size={18} /> Viết đánh giá
                </button>
              </div>
              <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--primary)', fontSize: '0.875rem', textAlign: 'center' }}>
                Hiện chưa có đánh giá nào cho khu trọ này. Hãy là người đầu tiên!
              </div>
            </div>

            <div>
              <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Quan tâm phòng này?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button onClick={() => setShowAppointmentModal(true)} className="btn btn-primary" style={{ width: '100%', padding: '1rem', gap: '0.5rem' }}>
                    <Calendar size={18} /> Đặt lịch xem phòng
                  </button>
                  <button onClick={() => setShowDepositModal(true)} className="btn btn-outline" style={{ width: '100%', padding: '1rem', gap: '0.5rem' }}>
                    <DollarSign size={18} /> Đặt cọc giữ chỗ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <Modal isOpen={showAppointmentModal} onClose={() => setShowAppointmentModal(false)} title="Đặt lịch xem phòng">
        <form onSubmit={handleBookAppointment}>
          <div className="input-group">
            <label className="input-label">Chọn ngày & giờ</label>
            <input type="datetime-local" className="input-field" required value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Quản lý sẽ xác nhận lịch hẹn của bạn qua số điện thoại hoặc email.
          </p>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Xác nhận lịch hẹn</button>
        </form>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={showReviewModal} onClose={() => setShowReviewModal(false)} title="Viết đánh giá">
        <form onSubmit={handleSubmitReview}>
          <div className="input-group">
            <label className="input-label">Số sao</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map(num => (
                <Star 
                  key={num} size={24} 
                  fill={num <= reviewRate ? 'var(--accent)' : 'none'} 
                  color={num <= reviewRate ? 'var(--accent)' : 'var(--border)'}
                  onClick={() => setReviewRate(num)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Nội dung</label>
            <textarea 
              className="input-field" rows="4" placeholder="Cảm nhận của bạn về phòng trọ và chủ trọ..."
              value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Gửi đánh giá</button>
        </form>
      </Modal>

      {/* Deposit Modal Simulation */}
      <Modal isOpen={showDepositModal} onClose={() => setShowDepositModal(false)} title="Đặt cọc giữ chỗ">
        <div style={{ textAlign: 'center' }}>
          <DollarSign size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
          <p style={{ marginBottom: '1.5rem' }}>Bạn cần thanh toán <strong>1.000.000 đ</strong> để giữ chỗ cho phòng này trong 3 ngày.</p>
          <button onClick={() => alert("Tính năng thanh toán Stripe đang được tích hợp...")} className="btn btn-primary" style={{ width: '100%' }}>Thanh toán qua Stripe</button>
        </div>
      </Modal>

      <style>{`
        @media (max-width: 768px) {
          .md-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default UnitDetails;
