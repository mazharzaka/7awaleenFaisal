"use client";
import React from "react";
import LoadingSkeleton from "../UI/LoadingSkeleton";
import EmptyState from "../UI/EmptyState";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductGridSkeletonProps {
  count?: number;
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingSkeleton key={index} variant="product-card" />
      ))}
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  error?: string;
}

export const ProductList: React.FC<ProductListProps> = ({ products, isLoading, error }) => {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (error) {
    return (
      <EmptyState
        title="حدث خطأ"
        description={error}
        actionLabel="إعادة المحاولة"
        onAction={() => window.location.reload()}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="لا توجد منتجات"
        description="لم نجد أي منتجات تطابق البحث"
        actionLabel="العودة للرئيسية"
        actionHref="/"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id}>
          {/* Your existing product card component */}
        </div>
      ))}
    </div>
  );
};
