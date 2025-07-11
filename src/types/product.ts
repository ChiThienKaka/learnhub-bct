export interface Product {
    id: string;                 // "edu2"
    title: string;              // "Kỹ năng tạo giáo án điện tử"
    price: number;              // 350000
    image: string;              // URL hình ảnh
    shortDescription: string;   // Mô tả ngắn
    fullDescription: string;    // Mô tả chi tiết
    rating: number;             // 4.6
    isFavorite?: boolean;       // tuỳ chọn, để kiểm tra đã thích hay chưa
  }
  