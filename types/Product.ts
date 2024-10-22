interface Product {
  _id: string;
  name: string;
  size: string[];
  stock: number;
  price: number;
  category: {
    name: string;
    gender: string;
  };
  brand: string;
  images: string[];
  description: string;
  sale: number;
}

export default Product;
