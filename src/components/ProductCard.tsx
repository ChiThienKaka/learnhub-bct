import "./ProductCard.css";

import type { Product } from "../types/product";
import {HeartFilled, HeartOutlined} from '@ant-design/icons'
import { Button, notification, Rate } from "antd";
import localStoreService from "../services";
import { useData } from "./Context/dataContext";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  onViewDetails?: (product: Product) => void;
  showButton?: boolean;
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
  isHeart?:boolean;
}

const ProductCard = (props: ProductCardProps) => {
  const {setData} = useData();
  const [api, contextHolder] = notification.useNotification();
  const { product, onViewDetails, isHeart } = props;
  const openNotification = () => {
    api.open({
      message: 'Thông báo',
      description: 'Đã thêm sản phẩm này vào danh sách yêu thích',
      duration: 2,
      showProgress: true,
      placement: "topRight",
      icon:<HeartOutlined style={{color:"red"}} />
    });
  };
 
  const handleClickHeart = () => {
      openNotification();
      localStoreService.add('favorites', product);
      
      setData(localStoreService.getAll('favorites'));
  }
  return (
     <>
      {contextHolder}
      <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-body">
        <div className="product-card-title">{product.title}</div>
        <p className="product-description">{product.shortDescription}</p>
        <div className="product-price-rating">
          <span className="product-price">{product.price.toLocaleString()}₫</span>
          <span className="product-price-discount">{product.price.toLocaleString()}₫</span>
          {/* <span className="product-rating">⭐ {product.rating}</span> */}
        </div>
        <div className="product-favorite">
            <span className="product-rating">
               <span style={{fontWeight:"bold", color:"gray"}}>{product.rating} </span>
              <Rate style={{ fontSize: '0.7rem' }} disabled allowHalf defaultValue={product.rating} />
              <span style={{color:"gray", fontSize:"0.8rem"}}> (4113)</span>
            </span>

            {/* <span style={{cursor:"pointer"}}><HeartOutlined /></span> */}
            {isHeart ? <Button shape="circle" onClick={handleClickHeart} danger icon={<HeartFilled />} /> :
            <Button shape="circle" onClick={handleClickHeart} danger icon={<HeartOutlined />} />}
        </div>
        <button 
          className="product-button" 
          onClick={() => onViewDetails?.(product)}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
     </>
  );
};

export default ProductCard;
