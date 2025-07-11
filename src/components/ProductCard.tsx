import "./ProductCard.css";

import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  showButton?: boolean;
  buttonText?: string;
  children?: React.ReactNode;
  className?: string;
}

const ProductCard = (props: ProductCardProps) => {
  const { product} = props;

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.shortDescription}</p>
        <div className="product-price-rating">
          <span className="product-price">{product.price.toLocaleString()}₫</span>
          <span className="product-rating">⭐ {product.rating}</span>
        </div>
        <button className="product-button">Xem chi tiết</button>
      </div>
    </div>
  );
};

export default ProductCard;
