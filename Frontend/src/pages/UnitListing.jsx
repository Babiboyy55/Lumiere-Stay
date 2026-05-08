import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, ChevronDown, LayoutGrid, List as ListIcon } from 'lucide-react';
import UnitCard from '../components/UnitCard';
import api from '../api/api';

const MOCK_DATA = [
  { id: 1, type: 'Phòng trọ', price: 2500000, city: 'Quận 7, HCM', street: 'Phòng trọ cao cấp gần Lotte Mart', area: 25, image1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80' },
  { id: 2, type: 'Phòng trọ', price: 3000000, city: 'Bình Thạnh, HCM', street: 'Phòng mới xây, đầy đủ nội thất', area: 20, image1: 'https://images.unsplash.com/photo-1502672260266-1c1c2f156269?auto=format&fit=crop&w=800&q=80' },
  { id: 3, type: 'Căn hộ', price: 7500000, city: 'Quận 2, HCM', street: 'Căn hộ mini ban công thoáng mát', area: 40, image1: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80' },
  { id: 4, type: 'Phòng trọ', price: 1800000, city: 'Thủ Đức, HCM', street: 'Phòng trọ sinh viên giá rẻ', area: 15, image1: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80' },
  { id: 5, type: 'Nhà nguyên căn', price: 15000000, city: 'Quận 1, HCM', street: 'Nhà nguyên căn trung tâm thành phố', area: 120, image1: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80' },
  { id: 6, type: 'Ký túc xá', price: 1200000, city: 'Quận 9, HCM', street: 'Sleepbox cao cấp chuẩn 5 sao', area: 10, image1: 'https://images.unsplash.com/photo-1555854817-40e0742ff257?auto=format&fit=crop&w=800&q=80' },
];

const UnitListing = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUnits = async (term = '') => {
    setLoading(true);
    try {
      const url = term ? `/Unit/Search?searchTerm=${term}` : '/Unit';
      const r = await api.get(url);
      setUnits(r.data?.length ? r.data : MOCK_DATA);
    } catch (err) {
      console.warn("API Error, using mock data", err);
      setUnits(MOCK_DATA);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    fetchUnits(searchTerm);
  };

  return (
    <div className="listing">
      <div className="listing__header">
        <div className="container">
          <div className="listing__breadcrumb">Trang chủ / Phòng trọ tại Việt Nam</div>
          <h1 className="listing__title">Cho thuê phòng trọ, nhà trọ tại Việt Nam</h1>
          <p className="listing__subtitle">Tìm thấy <span>{units.length}</span> kết quả phù hợp</p>
        </div>
      </div>

      <div className="container listing__container">
        <aside className="listing__sidebar hide-mobile">
          <div className="filter-box">
            <h3 className="filter-box__title"><Search size={18} /> Tìm kiếm nhanh</h3>
            
            <div className="filter-group">
              <label>Từ khóa</label>
              <input 
                type="text" 
                className="filter-input" 
                placeholder="Ví dụ: Quận 7, Studio..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="filter-group">
              <label>Khu vực</label>
              <select className="filter-input">
                <option>Tất cả Tỉnh/Thành</option>
                <option>Hồ Chí Minh</option>
                <option>Hà Nội</option>
                <option>Đà Nẵng</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Khoảng giá</label>
              <div className="filter-chips">
                {['Dưới 2tr', '2tr - 5tr', '5tr - 10tr', 'Trên 10tr'].map(p => (
                  <button key={p} className="filter-chip">{p}</button>
                ))}
              </div>
            </div>

            <button onClick={handleSearch} className="btn btn-primary w-full" style={{ marginTop: '10px' }}>
              Tìm kiếm
            </button>
          </div>
        </aside>

        <main className="listing__main">
          <div className="listing__sort-bar">
            <div className="listing__sort-left">
              <span>Sắp xếp:</span>
              <button className="sort-btn active">Mới nhất</button>
              <button className="sort-btn">Giá thấp đến cao</button>
            </div>
            <div className="listing__view-toggle">
              <button className={`view-btn ${viewType === 'grid' ? 'active' : ''}`} onClick={() => setViewType('grid')}><LayoutGrid size={18} /></button>
              <button className={`view-btn ${viewType === 'list' ? 'active' : ''}`} onClick={() => setViewType('list')}><ListIcon size={18} /></button>
            </div>
          </div>

          <div className={`listing__grid ${viewType === 'list' ? 'listing__grid--list' : ''}`}>
            {loading ? (
              <p>Đang tải danh sách...</p>
            ) : (
              units.map((unit, i) => <UnitCard key={unit.id} unit={unit} index={i} />)
            )}
          </div>

          <div className="listing__pagination">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">...</button>
            <button className="page-btn">Tiếp theo</button>
          </div>
        </main>
      </div>

      <style>{`
        .listing { background: #f8fafc; min-height: 100vh; padding-bottom: 80px; }
        .listing__header { background: white; padding: 100px 0 30px; border-bottom: 1px solid #eee; }
        .listing__breadcrumb { font-size: 13px; color: #64748b; margin-bottom: 12px; }
        .listing__title { font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
        .listing__subtitle span { color: #1e62d0; font-weight: 700; }

        .listing__container { display: grid; grid-template-columns: 280px 1fr; gap: 30px; padding-top: 30px; }

        .filter-box { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; position: sticky; top: 100px; }
        .filter-box__title { font-size: 16px; font-weight: 700; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
        .filter-group { margin-bottom: 20px; }
        .filter-group label { display: block; font-size: 14px; font-weight: 600; margin-bottom: 10px; color: #475569; }
        .filter-input { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; }
        .filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .filter-chip { padding: 6px 12px; background: #f1f5f9; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; border: 1px solid transparent; }
        .filter-chip:hover { border-color: #1e62d0; color: #1e62d0; }

        .listing__sort-bar { background: white; padding: 12px 20px; border-radius: 12px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .listing__sort-left { display: flex; align-items: center; gap: 15px; font-size: 14px; }
        .sort-btn { font-weight: 500; color: #64748b; }
        .sort-btn.active { color: #1e62d0; font-weight: 700; }
        .listing__view-toggle { display: flex; gap: 8px; }
        .view-btn { padding: 6px; color: #94a3b8; }
        .view-btn.active { color: #1e62d0; }

        .listing__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .listing__grid--list { grid-template-columns: 1fr; }

        .listing__pagination { display: flex; justify-content: center; gap: 8px; margin-top: 40px; }
        .page-btn { width: 40px; height: 40px; border-radius: 8px; background: white; border: 1px solid #e2e8f0; font-weight: 600; font-size: 14px; transition: 0.3s; }
        .page-btn.active { background: #1e62d0; color: white; border-color: #1e62d0; }
        .page-btn:hover:not(.active) { border-color: #1e62d0; color: #1e62d0; }

        .w-full { width: 100%; }

        @media (max-width: 768px) {
          .listing__container { grid-template-columns: 1fr; }
          .listing__header { padding-top: 80px; }
        }
      `}</style>
    </div>
  );
};

export default UnitListing;
