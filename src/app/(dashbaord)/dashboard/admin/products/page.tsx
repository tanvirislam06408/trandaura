import { serverFetch } from '@/lib/core/server';
import React from 'react';
import ManageProductsPage from './ManageProductsPage';

interface AdminProduct {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  rating: number;
  location: string;
  duration: string;
  category: string;
  image: string;
}

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const ManageProducts = async({ searchParams }: PageProps) => {
  const {page}=await searchParams
  console.log('currnet',page);
  const productData=await serverFetch<{products: AdminProduct[]; currentPage: number; totalPages: number}>(`/products?page=${page}`);


  return (
    <div>
      <ManageProductsPage productData={productData}/>

    </div>
  );
};

export default ManageProducts;