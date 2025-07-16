import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from '../components/Header';


const { Content } = Layout;


import '../App.css'


interface LayoutDefaultProps {
  children: React.ReactNode;
}

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [cartItemCount, setCartItemCount] = useState(0); // Mock cart count

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePriceFilter = (range: string) => {
    setPriceFilter(range);
  };

  return (
    <Layout className="app-layout">
      <Header
        onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        cartItemCount={cartItemCount}
      />
      <Content className="app-content">
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutDefault;
