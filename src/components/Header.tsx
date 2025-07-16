import React, { useState } from 'react';
import { Layout, Input, Select, Button, Drawer, Menu, Space, Typography, Badge, Avatar } from 'antd';
import { SearchOutlined,HistoryOutlined, FilterOutlined, MenuOutlined, ShoppingCartOutlined, UserOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import './Header.css';
import PopupUser from './PopupUser';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleUserClick = () => {
    // TODO: Implement user functionality
    console.log('User clicked');
  };

  const menuItems = [
    { key: 'home', label: 'Trang chủ'},
    { key: 'teaching', label: 'Giảng dạy' },
    { key: 'courses', label: 'Khóa học' },
    { key: 'about', label: 'Giới thiệu' },
    // { key: 'contact', label: 'Liên hệ' },
  ];
  const menuItemsMobile = [
    { key: 'history', label: 'Lịch sử sản phẩm', icon:<HistoryOutlined /> },
    { key: 'favorites', label: 'Sản phẩm yêu thích', icon: <HeartOutlined /> },
    ...menuItems
  ];
  const handleClickSubMenu = (item:any):void=>{
       switch(item.key){
        case 'home':
          navigate('/');
          break
        case 'history':
          navigate('/history');
          break
        case 'favorites':
          navigate('/favorites');
          break
        default:
          console.warn(`Không tìm thấy mục phụ cho key: ${item.key}`);
          break;
       }
  }
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
            onClick={handleClickSubMenu}
            items={menuItems}
            className="desktop-menu"
          />
        </div>

        {/* Search, Filter, Cart, User */}
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
          {/* User Avatar - Desktop */}
          <PopupUser>
          <Avatar
            icon={<UserOutlined />}

            className="user-avatar"
            onClick={handleUserClick}
            style={{ cursor: 'pointer', marginLeft: 8 }}
            size={25}
          />
          </PopupUser>
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
        title={null}
        placement="right"
        onClose={closeMobileMenu}
        open={mobileMenuVisible}
        className="mobile-drawer"
        styles={{body: {padding: 0, display: 'flex', flexDirection: 'column', height: '100%'}}}
      >
        {/* User Avatar Section */}
        <div className="drawer-avatar-section">
          <Avatar
            icon={<UserOutlined />}
            className="user-avatar"
            onClick={handleUserClick}
            size="large"
            style={{ cursor: 'pointer', margin: '16px auto 8px auto', display: 'block' }}
          />
          {/* <div className="drawer-username">Tên người dùng</div> */}
        </div>

        {/* Search & Filter Section */}
        <div className="drawer-search-section">
          <Search
            placeholder="Tìm kiếm sản phẩm..."
            allowClear
            onSearch={handleSearch}
            style={{ marginBottom: 12 }}
          />
          <Select
            value={priceFilter}
            onChange={handlePriceFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">Tất cả giá</Option>
            <Option value="under500k">Dưới 500K</Option>
            <Option value="500k-1m">500K - 1 triệu</Option>
            <Option value="over1m">Trên 1 triệu</Option>
          </Select>
        </div>

        {/* Menu Section */}
        <Menu
          mode="vertical"
          items={menuItemsMobile}
          className="mobile-menu"
          onClick={handleClickSubMenu}
        />

        {/* Cart Button - Mobile (always at bottom) */}
        <div className="drawer-cart-section">
          <Badge count={cartItemCount} size="small">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleCartClick}
              style={{ width: '100%', height: 48, fontWeight: 600, fontSize: 16 }}
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