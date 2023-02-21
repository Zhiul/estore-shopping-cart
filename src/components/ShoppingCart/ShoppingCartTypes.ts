export interface ShopItem {
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  id: string;
}

export interface shoppingCartItem {
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  id: string;
  quantity: number;
  increase(): void;
  decrease(): void;
}
