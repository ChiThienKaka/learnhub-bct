import { Row, Col, Empty, Button, Skeleton } from 'antd';
import { GiftOutlined } from '@ant-design/icons';
import ProductCard from '../../components/ProductCard';
import ProductDetails from '../products/ProductDetails';
import type { Product } from '../../types/product';
import { useEffect, useState, useMemo } from 'react';
import { fetchProducts } from '../../api/productAPI';
import localStoreService from '../../services';
// import type { LocalStoreItem } from '../../services/localStores.services';
import { useData } from '../../components/Context/dataContext';
import SupportChatBox from '../ChatBox/SupportChatBox';

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
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  // const [favorites, setFavorites] = useState<LocalStoreItem[]>([]);
  const {data} = useData();

  useEffect(() => {
    fetchProducts().then(setProducts);

    // heartViews();
  }, []);
  function getRandomItems<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }
  
  // const heartViews = () => {
  //     const list = localStoreService.getAll('favorites');
  //     console.log(list)
  //     setFavorites(list)
  // }
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
    localStoreService.add('history', product)
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

  const handleSuggestProducts = () => {
    setLoadingSuggest(true);
    setTimeout(() => {
      setLoadingSuggest(false);
    }, 3000); // 3 giây
    setProducts(getRandomItems(products,12));
  };


  return (
    <div className="product-list-container">
       {/* Nút Gợi ý sản phẩm phù hợp */}
       <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button
          // type="primary"

          className="suggest-btn"
          icon={<GiftOutlined />}
          style={{
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            fontWeight: 600,
            padding: '0 28px',
            border: '1px solid #4076ed',
            color: '#4076ed',
            backgroundColor: 'white',
            height: 44,
            fontSize: 16,
            // width: 'auto',
            transition: 'all 0.2s',
            display: 'inline-flex',
            alignItems: 'center',
          }}
          onClick={handleSuggestProducts}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#2451a6';
            e.currentTarget.style.borderColor = '#2451a6';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#4076ed';
            e.currentTarget.style.borderColor = '#4076ed';
          }}
          
        >
          Gợi ý sản phẩm phù hợp
        </Button>
        <style>{`
          @media (max-width: 600px) {
            .suggest-btn {
              width: 100% !important;
              padding: 0 0 !important;
              font-size: 15px !important;
            }
          }
        `}</style>
      </div>
      {loadingSuggest ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255,255,255,0.96)',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
          <Row gutter={[24, 24]} justify="center" style={{ width: '90vw', maxWidth: 1200 }}>
            {[1,2,3,4].map(i => (
              <Col key={i} xs={24} sm={12} md={8} lg={6} xl={6} xxl={6} style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                <Skeleton loading={true} active paragraph={{ rows: 5 }} style={{ width: '100%' }} />
              </Col>
            ))}
          </Row>
          <div style={{ color: '#4076ed', fontWeight: 400, fontSize: 18, marginTop: 24 }}>Đang tìm kiếm sản phẩm phù hợp cho bạn...</div>
        </div>
      ) : (
        filteredProducts.length === 0 ? (
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
                  isHeart={data.some(item => item.id === product.id)}
                />
              </Col>
            ))}
          </Row>
        )
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
