import React, { useState } from 'react';
import { Layout, Input, Select, Button, Drawer, Menu, Space, Typography, Badge } from 'antd';
import { SearchOutlined, FilterOutlined, MenuOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title } = Typography;

interface HeaderProps {
  onSearch: (value: string) => void;
  onPriceFilter: (range: string) => void;
  cartItemCount?: number;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onPriceFilter, cartItemCount = 0 }) => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch(value);
  };

  const handlePriceFilter = (value: string) => {
    setPriceFilter(value);
    onPriceFilter(value);
  };

  const showMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  const handleCartClick = () => {
    // TODO: Implement cart functionality
    console.log('Cart clicked');
  };

  const menuItems = [
    { key: 'home', label: 'Trang chủ' },
    { key: 'teaching', label: 'Giảng dạy' },
    { key: 'courses', label: 'Khóa học' },
    { key: 'about', label: 'Giới thiệu' },
    // { key: 'contact', label: 'Liên hệ' },
  ];

  return (
    <AntHeader className="header">
      <div className="header-container">
        {/* Logo và Navigation */}
        <div className="header-left">
          <Title level={3} className="logo">
            LearnHub
          </Title>
          
          {/* Desktop Menu */}
          <Menu
            mode="horizontal"
            items={menuItems}
            className="desktop-menu"
          />
        </div>

        {/* Search và Filter */}
        <div className="header-center">
          <Space.Compact className="search-filter-group">
            <Search
              placeholder="Tìm kiếm sản phẩm..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 300 }}
              className="search-input"
            />
            <Select
              value={priceFilter}
              onChange={handlePriceFilter}
              style={{ width: 150 }}
              className="price-filter"
            >
              <Option value="all">Tất cả giá</Option>
              <Option value="under500k">Dưới 500K</Option>
              <Option value="500k-1m">500K - 1 triệu</Option>
              <Option value="over1m">Trên 1 triệu</Option>
            </Select>
          </Space.Compact>
          
          {/* Cart Button - Desktop */}
          <Badge count={cartItemCount} size="small" className="cart-badge-desktop">
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              onClick={handleCartClick}
              className="cart-btn"
            />
          </Badge>
        </div>

        {/* Mobile Menu Button */}
        <div className="header-right">
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showMobileMenu}
            className="mobile-menu-btn"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeMobileMenu}
        open={mobileMenuVisible}
        className="mobile-drawer"
      >
        <div className="mobile-search-section">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            onSearch={handleSearch}
            style={{ marginBottom: 16 }}
          />
          <Select
            value={priceFilter}
            onChange={handlePriceFilter}
            style={{ width: '100%', marginBottom: 16 }}
          >
            <Option value="all">Tất cả giá</Option>
            <Option value="under500k">Dưới 500K</Option>
            <Option value="500k-1m">500K - 1 triệu</Option>
            <Option value="over1m">Trên 1 triệu</Option>
          </Select>
        </div>
        
        <Menu
          mode="vertical"
          items={menuItems}
          className="mobile-menu"
        />
        
        {/* Cart Button - Mobile */}
        <div className="mobile-cart-section">
          <Badge count={cartItemCount} size="small">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleCartClick}
              style={{ width: '100%', height: 48 }}
            >
              Giỏ hàng ({cartItemCount})
            </Button>
          </Badge>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default Header; 