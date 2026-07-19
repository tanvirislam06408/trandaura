import { serverFetch } from '@/lib/core/server';
import React from 'react';
import ManageProductsPage from './ManageProductsPage';
import { getSession } from '@/lib/core/session';

interface AdminProduct {
  _id: string;
  fruitName: string;
  sellerId: string;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  season: string;
  origin: string;
  stockQuantity: number;
  featured: boolean;
  imageUrl: string;
  rating: number;
  location: string;
  duration: string;
  availableDate: string;
  nutritionInfo: string;
  image: string;
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ManageProducts = async({ searchParams }: PageProps) => {
  const user=await getSession()
 
  const productData=await serverFetch<AdminProduct[]>(`/api/get-orders/${user?.id}`);
  
  return (
    <div>
      <ManageProductsPage products={productData}/>

    </div>
  );
};

export default ManageProducts;