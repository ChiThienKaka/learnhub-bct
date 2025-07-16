import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Popover } from 'antd';
import { HistoryOutlined, HeartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface PopupUserProps {
  children: ReactNode;
  onHistoryClick?: () => void;
  onFavoriteClick?: () => void;
}

const itemStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 6,
  fontSize: 15,
  color: '#222',
  cursor: 'pointer',
  transition: 'background 0.2s',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
};

const itemHoverStyle: React.CSSProperties = {
  background: '#f0f6ff',
  color: '#2563eb',
};

const PopupUser: React.FC<PopupUserProps> = ({ children, onHistoryClick, onFavoriteClick }) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const navigate = useNavigate();
  const content = (
    <div style={{ minWidth: 180 }}>
      <div
        style={{ ...itemStyle, ...(hovered === 'history' ? itemHoverStyle : {}) }}
        onMouseEnter={() => setHovered('history')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          setOpen(false);
          navigate('/history');
          onHistoryClick?.();
        }}
      >
        <HistoryOutlined style={{ fontSize: 16 }} />
        Lịch sử xem
      </div>
      <div
        style={{ ...itemStyle, ...(hovered === 'favorite' ? itemHoverStyle : {}) }}
        onMouseEnter={() => setHovered('favorite')}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          setOpen(false);
          navigate('/favorites');
          onFavoriteClick?.();
        }}
      >
        <HeartOutlined style={{ fontSize: 16 }} />
        Sản phẩm yêu thích
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottomRight"
      overlayClassName="popup-user-popover"
    >
      <span style={{ display: 'inline-block', cursor: 'pointer' }}>{children}</span>
    </Popover>
  );
};

export default PopupUser;
