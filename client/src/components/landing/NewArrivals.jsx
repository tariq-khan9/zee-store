"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProductGrid from "./ProductGrid";

const categories = [
  { id: 1, name: " Men " },
  { id: 2, name: "Women" },
  { id: 3, name: " Kids " },
];

const NewArrivals = ({ products, className }) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  //const filteredProducts = products;
  const filteredProducts = products
    .filter((product) => {
      return product.category === activeCategory;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    .slice(0, 8);

  return (
    <section className={`py-16 ${className || ""}`}>
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">New Arrivals</h2>
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
                className={` text-sm px-6 rounded-none ${
                  activeCategory === category.id ? "" : "dark:bg-gray-800"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <ProductGrid products={filteredProducts} />

        <div className="mt-10 text-center">
          <Button
            variant="outline"
            className=" px-8 dark:bg-gray-800 rounded-none"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
