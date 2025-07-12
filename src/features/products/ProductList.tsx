import { Row, Col, Empty } from 'antd';
import ProductCard from '../../components/ProductCard';
import ProductDetails from '../products/ProductDetails';
import type { Product } from '../../types/product';
import { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '../../api/productAPI';

interface ProductListProps {
  searchTerm?: string;
  priceFilter?: string;
}

const ProductList: React.FC<ProductListProps> = ({ 
  searchTerm = '', 
  priceFilter = 'all' 
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  // Filter products based on search term and price filter
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    if (priceFilter !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.price; // price is already a number
        switch (priceFilter) {
          case 'under500k':
            return price < 500000;
          case '500k-1m':
            return price >= 500000 && price <= 1000000;
          case 'over1m':
            return price > 1000000;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [products, searchTerm, priceFilter]);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Implement add to cart functionality
    console.log('Added to cart:', product.title);
  };

  const handleToggleFavorite = (product: Product) => {
    // TODO: Implement favorite functionality
    console.log('Toggled favorite:', product.title);
  };



  return (
    <div className="product-list-container">
      {filteredProducts.length === 0 ? (
        <Empty
          description={
            searchTerm || priceFilter !== 'all'
              ? "Không tìm thấy sản phẩm phù hợp"
              : "Đang tải sản phẩm..."
          }
          style={{ margin: '50px 0' }}
        />
      ) : (
        <Row gutter={[24, 24]} justify="center">
          {filteredProducts.map((product) => (
            <Col
              key={product.id}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              xxl={6}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <ProductCard 
                product={product} 
                onViewDetails={handleViewDetails}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* Product Details Modal */}
      <ProductDetails
        product={selectedProduct}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default ProductList;
