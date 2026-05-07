export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Men" | "Women" | "Accessories";
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  address: string;
  postalCode: string;
  phone: string;
}
