import React from 'react';

const SkeletonLoader = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col bg-brand-cream border border-brand-charcoal/5 rounded-2xl overflow-hidden shadow-sm">
          {/* Image Skeleton */}
          <div className="h-56 skeleton-loading bg-brand-charcoal/5"></div>
          
          {/* Content Skeleton */}
          <div className="p-5 flex flex-col gap-3">
            {/* Title Skeleton */}
            <div className="h-6 w-3/4 skeleton-loading bg-brand-charcoal/10 rounded"></div>
            
            {/* Subtitle Skeleton */}
            <div className="h-4 w-1/2 skeleton-loading bg-brand-charcoal/8 rounded"></div>
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-3 w-full skeleton-loading bg-brand-charcoal/5 rounded"></div>
              <div className="h-3 w-5/6 skeleton-loading bg-brand-charcoal/5 rounded"></div>
              <div className="h-3 w-4/6 skeleton-loading bg-brand-charcoal/5 rounded"></div>
            </div>
            
            {/* Price Skeleton */}
            <div className="flex justify-between mt-auto pt-3 border-t border-brand-charcoal/5">
              <div className="h-4 w-12 skeleton-loading bg-brand-charcoal/8 rounded"></div>
              <div className="h-6 w-20 skeleton-loading bg-brand-charcoal/10 rounded"></div>
            </div>
            
            {/* Button Skeleton */}
            <div className="h-12 w-full skeleton-loading bg-brand-charcoal/10 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
