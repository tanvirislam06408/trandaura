export interface Product {
  _id?: string;
  fruitName: string;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  origin: string;
  season: string;
  stockQuantity: number;
  nutritionInfo: string;
  category: string;
  featured?: boolean;
  imageUrl: string;
}

