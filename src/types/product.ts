export interface Product {
  _id?: string;
  fruitName: string;
  shortDescription: string;
  description: string;
  category: string;
  imageUrl: string;
  price: number;
  unit: string;
  season: string;
  origin: string;
  stockQuantity: number;
  nutritionInfo: string;
  featured?: boolean;
  rating?: number;
}
