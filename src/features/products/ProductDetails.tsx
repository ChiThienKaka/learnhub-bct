import React from 'react';
import { Modal, Row, Col, Rate, Button, Tag, Divider, Image, Space, Typography } from 'antd';
import { HeartOutlined, HeartFilled, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import type { Product } from '../../types/product';
import './ProductDetails.css';

const { Title, Text, Paragraph } = Typography;

interface ProductDetailsProps {
  product: Product | null;
  visible: boolean;
  onClose: () => void;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  visible,
  onClose,
  onAddToCart,
  onToggleFavorite
}) => {
  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(product);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      className="product-details-modal"
      destroyOnClose
      centered={window.innerWidth > 768}
      style={{ top: window.innerWidth <= 768 ? 0 : undefined }}
    >
      <div className="product-details-container">
        <Row gutter={[32, 24]}>
          {/* Product Image Section */}
          <Col xs={24} lg={12}>
            <div className="product-image-section">
              <Image
                src={product.image}
                alt={product.title}
                className="product-detail-image"
                preview={false}
              />
              <div className="product-image-overlay">
                <Button
                  type="text"
                  icon={product.isFavorite ? <HeartFilled /> : <HeartOutlined />}
                  className="favorite-button"
                  onClick={handleToggleFavorite}
                />
              </div>
            </div>
            {/* Additional Info */}
            <div className="additional-info">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text strong>Thời gian học:</Text>
                      <Text>Trọn đời</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text strong>Trình độ:</Text>
                      <Text>Từ cơ bản đến nâng cao</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text strong>Ngôn ngữ:</Text>
                      <Text>Tiếng Việt</Text>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div className="info-item">
                      <Text strong>Chứng chỉ:</Text>
                      <Text>Có</Text>
                    </div>
                  </Col>
                </Row>
              </div>
          </Col>

          {/* Product Info Section */}
          <Col xs={24} lg={12}>
            <div className="product-info-section">
              <Title level={2} className="product-title">
                {product.title}
              </Title>

              {/* Rating Section */}
              <div className="rating-section">
                <Space align="center">
                  <Rate 
                    disabled 
                    allowHalf 
                    defaultValue={product.rating} 
                    className="product-rating"
                  />
                  <Text strong className="rating-text">
                    {product.rating}
                  </Text>
                  <Text type="secondary" className="rating-count">
                    (4,113 đánh giá)
                  </Text>
                </Space>
              </div>

              {/* Price Section */}
              <div className="price-section">
                <div className="current-price">
                  <Text className="price-amount">
                    {product.price.toLocaleString()}₫
                  </Text>
                </div>
                <div className="original-price">
                  <Text delete type="secondary">
                    {(product.price * 1.2).toLocaleString()}₫
                  </Text>
                  <Tag color="red" className="discount-tag">
                    -20%
                  </Tag>
                </div>
              </div>

              <Divider />

              {/* Description Section */}
              <div className="description-section">
                <Title level={4}>Mô tả sản phẩm</Title>
                <Paragraph className="product-description">
                  {product.fullDescription}
                </Paragraph>
              </div>

              {/* Features Section */}
              <div className="features-section">
                <Title level={4}>Tính năng nổi bật</Title>
                <ul className="features-list">
                  <li>Nội dung chất lượng cao, được biên soạn bởi chuyên gia</li>
                  <li>Học mọi lúc, mọi nơi với thiết bị di động</li>
                  <li>Truy cập trọn đời, không giới hạn thời gian</li>
                  <li>Hỗ trợ 24/7 từ đội ngũ chuyên môn</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <Space size="large" className="button-group">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    className="add-to-cart-btn"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    size="large"
                    className="buy-now-btn"
                  >
                    Mua ngay
                  </Button>
                </Space>
              </div>

              
            </div>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ProductDetails; 