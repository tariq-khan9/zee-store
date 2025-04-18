"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${product.slug}`}>
      <Card
        className={`overflow-hidden dark:bg-gray-800  h-full transition-all duration-300 border hover:shadow-lg rounded-none ${
          isHovered ? "transform hover:-translate-y-1" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-secondary/30 -m-6 p-0">
          <img
            src={`http://127.0.0.1:8000${
              product.product_media ? product.product_media[0]?.img_url : ""
            }`}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />
          {/* Badges */}
        </div>
        <CardContent className={`p-4  ${featured ? "p-6" : ""}`}>
          <div className="space-y-1">
            <h3 className={`font-medium truncate ${featured ? "text-xl" : ""}`}>
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground truncate">
              {product.description?.charAt(0).toUpperCase() +
                product.description?.slice(1)}
            </p>
          </div>
        </CardContent>
        <CardFooter
          className={`p-3 px-4 pt-0  flex items-center justify-between ${
            featured ? "p-4 px-6 pt-0" : ""
          }`}
        >
          <p className="text-sm text-muted-foreground gap-2 truncate">
            <span className="font-semibold">Price: </span>
            {product.product_variants[0].store_price}
          </p>
          <div
            className="transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <Button size="sm" variant="outline" className=" rounded-full">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
