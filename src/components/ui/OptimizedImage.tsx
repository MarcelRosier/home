import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  variant?: "thumbnail" | "medium";
  onClick?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  blur = false,
  variant = "thumbnail",
  onClick,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const [currentSrc, setCurrentSrc] = useState("");
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(false);

  // Extract filename from src for generating optimized paths
  const getFilename = (path: string) => {
    const filename = path.split("/").pop()?.replace(".webp", "") || "";
    return filename;
  };

  const filename = getFilename(src);

  // Generate different image sources
  const sources = {
    blur: `/images/photography/blur/${filename}.webp`,
    thumb: `/images/photography/thumbs/${filename}.webp`,
    medium: `/images/photography/medium/${filename}.webp`,
    original: src,
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  // Progressive loading logic
  useEffect(() => {
    if (!isVisible) return;

    const loadImage = async () => {
      try {
        // Start with blur placeholder if enabled
        if (blur && !currentSrc) {
          setCurrentSrc(sources.blur);
        }

        // Then load the appropriate size
        const targetSrc =
          variant === "thumbnail" ? sources.thumb : sources.medium;

        const img = new Image();
        img.src = targetSrc;

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setCurrentSrc(targetSrc);
        setIsLoaded(true);
      } catch (error) {
        console.warn(`Failed to load image: ${filename}`, error);
        setImageError(true);
        // Fallback to original
        setCurrentSrc(sources.original);
      }
    };

    loadImage();
  }, [isVisible, filename, blur, variant]);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image error
  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      setCurrentSrc(sources.original); // Fallback to original
    }
  };

  return (
    <div
      ref={imgRef}
      className={cn("relative overflow-hidden bg-muted", className)}
      onClick={onClick}
    >
      {/* Loading placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted">
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted-foreground/10" />
        </div>
      )}

      {/* Main image */}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={cn(
            "h-full w-full transition-all duration-500",
            variant === "thumbnail" ? "object-cover" : "",
            isLoaded ? "opacity-100" : "opacity-0",
            blur && !isLoaded && "blur-sm scale-110",
            onClick &&
              "cursor-pointer hover:scale-105 transition-transform duration-300"
          )}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
        />
      )}

      {/* Error fallback */}
      {imageError && !currentSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Image unavailable</div>
          </div>
        </div>
      )}
    </div>
  );
}
