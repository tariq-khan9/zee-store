"use client";
import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMobile } from "@/hooks/useMobile";

const BestSelling = ({ topSoldProducts }) => {
  const title = "best selling";
  const subtitle = "  Shop our most popular products";
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const carouselRef = useRef(null);
  const isMobile = useMobile();

  useEffect(() => {
    const updateMaxScroll = () => {
      if (carouselRef.current) {
        setMaxScroll(
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        );
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const clientWidth = carouselRef.current.clientWidth;
      const scrollAmount =
        direction === "left" ? -clientWidth * 0.8 : clientWidth * 0.8;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setScrollPosition((prev) => {
        const newPosition = prev + scrollAmount;
        return Math.max(0, Math.min(newPosition, maxScroll));
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const cardWidth = isMobile ? 280 : 300;
  const gap = 16;

  return (
    <div className="relative">
      {title && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      )}

      <div className="relative group">
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-4 -mx-4"
          style={{ scrollbarWidth: "none" }}
          onScroll={handleScroll}
        >
          {topSoldProducts.map((product) => (
            <div
              key={product.id}
              className="flex-none snap-start"
              style={{ width: cardWidth, minWidth: cardWidth }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {!isMobile && (
          <>
            <Button
              size="icon"
              variant="outline"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              onClick={() => scroll("left")}
              disabled={scrollPosition <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
              onClick={() => scroll("right")}
              disabled={scrollPosition >= maxScroll}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {Array.from({ length: Math.ceil(topSoldProducts.length / 3) }).map(
          (_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i * 3 <= scrollPosition / (cardWidth + gap) &&
                scrollPosition / (cardWidth + gap) < (i + 1) * 3
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-secondary"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BestSelling;
