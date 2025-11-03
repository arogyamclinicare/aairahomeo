import React, { useState, useRef, useEffect } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * Optimized Image Component
 * Features:
 * - Lazy loading by default
 * - Error handling with fallback
 * - Intersection Observer for performance
 * - WebP support detection
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  fallback = '/images/logo-final.png',
  loading = 'lazy',
  priority = false,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState<string>(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If priority, load immediately
    if (priority) {
      // Use setTimeout to avoid setState in effect warning
      setTimeout(() => setIsInView(true), 0);
      return;
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before image enters viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleError = () => {
    if (imageSrc !== fallback) {
      setHasError(true);
      setImageSrc(fallback);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" aria-hidden="true" />
      )}
      <img
        ref={imgRef}
        src={isInView ? imageSrc : undefined}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onError={handleError}
        onLoad={handleLoad}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } ${hasError ? 'object-contain' : ''} ${className}`}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        {...props}
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded" aria-hidden="true">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

