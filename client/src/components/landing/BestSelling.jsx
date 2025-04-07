"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductGrid from "./ProductGrid";

const categories = [
  { id: "new", name: "New Arrivals" },
  { id: "sale", name: "On Sale" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
];

const BestSelling = ({ products, className }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const filteredProducts = products;
  // const filteredProducts = products
  //   .filter((product) => {
  //     if (activeCategory === "new") return product.isNew;
  //     if (activeCategory === "sale") return product.oldPrice !== undefined;
  //     return product.category === activeCategory;
  //   })
  //   .slice(0, 6);

  return (
    <section className={`py-16 ${className || ""}`}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Best Selling</h2>
          <p className="text-muted-foreground mt-2">
            Shop our most popular products
          </p>
        </div>

        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full text-sm px-6"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <ProductGrid products={filteredProducts} />

        <div className="mt-10 text-center">
          <Button variant="outline" className="rounded-full px-8">
            View All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BestSelling;
