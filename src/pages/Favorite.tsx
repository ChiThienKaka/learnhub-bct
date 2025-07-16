import React, { useEffect, useState } from 'react';
import { List, Typography, Empty, Button } from 'antd';
import { localStoreService } from '../services/localStores.services';
import type { Product } from '../types/product';
import { EyeOutlined, DollarCircleOutlined, HistoryOutlined, DeleteOutlined, CloudOutlined, CloseOutlined } from '@ant-design/icons';
import { useData } from '../components/Context/dataContext';
const { Title, Paragraph } = Typography;

const Favorite: React.FC = () => {
const {data, setData} = useData();
//   const [favorite, setFavorite] = useState<Product[]>([]);

  // Lấy lại lịch sử từ localStorage
//   const refreshFavorite = () => {
//     const data = localStoreService.getAll<Product>('favorites');
//     setFavorite(data.reverse());
//   };

  useEffect(() => {
    // refreshFavorite();
  }, []);

  // Xóa 1 sản phẩm khỏi lịch sử
  const handleRemove = (id: string) => {
    localStoreService.remove<Product>('favorites', id);
    setData(localStoreService.getAll('favorietes'))
    // refreshFavorite();
  };

  // Xóa toàn bộ lịch sử
  const handleClear = () => {
    localStoreService.clear('favorites');
    setData(localStoreService.getAll('favorietes'))
    // refreshFavorite();
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 32px 32px' }}>
      <div className="history-header" style={{ textAlign: 'center', marginBottom: 36, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            fontWeight: 900,
            fontSize: 36,
            background: 'linear-gradient(90deg, #1890ff 10%, #f97316 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: 1.5,
            textShadow: '0 2px 12px rgba(24,144,255,0.10)',
            lineHeight: 1.1,
            borderRadius: 12,
            padding: '0 18px',
            userSelect: 'none',
          }}
        >
          {/* <HistoryOutlined style={{ fontSize: 20, color: '#1890ff', filter: 'drop-shadow(0 2px 8px #1890ff33)' }} /> */}
          Danh sách sản phẩm yêu thích
        </span>
        {data.length > 0 && (
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            style={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              fontWeight: 600,
              borderRadius: 8,
              minWidth: 120,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={handleClear}
          >
            Xóa tất cả
          </Button>
        )}
      </div>
      {data.length === 0 ? (
        <Empty description="Chưa có danh sách sản phẩm yêu thích" style={{ margin: '80px 0' }} />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item
              style={{
                padding: '28px 32px',
                borderBottom: '1.5px solid #f0f0f0',
                alignItems: 'center',
                background: '#fff',
                borderRadius: 18,
                marginBottom: 18,
                boxShadow: '0 2px 16px rgba(24,144,255,0.06)',
                transition: 'box-shadow 0.2s, transform 0.2s',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexWrap: 'wrap',
              }}
              className="history-list-item"
            >
              {/* Nút X xoá ở góc trên bên phải */}
              <button
                className="history-close-btn"
                onClick={() => handleRemove(item.id)}
                aria-label="Xóa khỏi lịch sử"
              >
                {/* × */}
                 <CloseOutlined />
              </button>
              <div style={{ position: 'relative', marginRight: 32 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: 140,
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: 16,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.09)',
                    background: '#f5f5f5',
                    transition: 'transform 0.25s',
                  }}
                  className="history-img"
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    background: 'linear-gradient(120deg,rgba(24,144,255,0.08) 0%,rgba(255,255,255,0.0) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 20, color: '#1a1a1a', flex: 1, lineHeight: 1.2 }}>{item.title}</span>
                </div>
                <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: 10, fontSize: 15, color: '#444' }}>{item.shortDescription}</Paragraph>
                <div style={{ fontWeight: 700, color: '#f97316', fontSize: 18, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <DollarCircleOutlined style={{ color: '#f59e42', fontSize: 20 }} />
                  {item.price.toLocaleString()}₫
                </div>
                {/* Nút Xem lại ở góc phải dưới */}
                <div className="history-view-btn-wrapper">
                  <Button
                    type="default"
                    danger
                    icon={<EyeOutlined />}
                    size="small"
                    style={{ borderRadius: 8, fontWeight: 600 }}
                  >
                    Xem lại
                  </Button>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
      <style>{`
        .history-header {
          position: relative;
        }
        .history-list-item:hover {
          box-shadow: 0 8px 32px rgba(24,144,255,0.13);
          transform: translateY(-2px) scale(1.01);
        }
        .history-list-item .history-img:hover {
          transform: scale(1.04);
        }
        .history-close-btn {
          position: absolute;
          top: 12px;
          right: 16px;
          z-index: 2;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(255,255,255,0.85);
          // color: #ff4d4f;
          color:"gray"
          font-size: 22px;
          font-weight: 500;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(255,77,79,0.08);
          cursor: pointer;
          opacity: 0.7;
          transition: background 0.2s, color 0.2s, opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .history-close-btn:hover {
          background: #ff4d4f;
          color: #fff;
          opacity: 1;
        }
        .history-view-btn-wrapper {
          position: absolute;
          right: 0;
          bottom: 0;
          padding: 0 0 8px 0;
          display: flex;
          justify-content: flex-end;
          width: 100%;
        }
        .history-view-btn-wrapper .ant-btn {
          min-width: 110px;
          height: 36px;
          font-size: 15px;
          box-shadow: 0 2px 8px rgba(24,144,255,0.08);
        }
        @media (max-width: 900px) {
          .history-header button {
            min-width: 90px !important;
            font-size: 14px !important;
            height: 36px !important;
            right: 8px !important;
          }
          .history-close-btn {
            top: 8px;
            right: 8px;
            width: 28px;
            height: 28px;
            font-size: 18px;
          }
          .history-view-btn-wrapper .ant-btn {
            min-width: 90px;
            height: 32px;
            font-size: 14px;
          }
        }
        @media (max-width: 600px) {
          .history-header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 10px;
          }
          .history-header button {
            position: static !important;
            width: 100% !important;
            margin-top: 12px !important;
            min-width: 0 !important;
            font-size: 15px !important;
            height: 38px !important;
          }
          .history-list-item {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 12px 4px !important;
          }
          .history-list-item .history-img {
            width: 64px !important;
            height: 64px !important;
            border-radius: 8px !important;
            margin-right: 0 !important;
            margin-bottom: 10px !important;
          }
          .history-list-item > div:first-child {
            margin-right: 0 !important;
            margin-bottom: 10px !important;
          }
          .ant-list-item-meta-title {
            font-size: 13px !important;
          }
          .ant-list-item-meta-description {
            font-size: 11px !important;
          }
          .history-close-btn {
            top: 6px;
            right: 6px;
            width: 26px;
            height: 26px;
            font-size: 16px;
          }
          .history-view-btn-wrapper {
            position: static;
            width: 100%;
            margin-top: 10px;
            padding: 0;
            justify-content: flex-end;
          }
          .history-view-btn-wrapper .ant-btn {
            width: 100%;
            min-width: 0;
            height: 38px;
            font-size: 15px;
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Favorite;