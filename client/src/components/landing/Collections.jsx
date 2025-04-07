"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Collections = ({ collections }) => {
  console.log("collections ", collections);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % collections.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,theme(colors.background),theme(colors.muted/30)_70%)]" />

      <div className="pt-20">
        <div className="relative h-[500px] ">
          {collections.map((category, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 rounded-2xl overflow-hidden ${
                index === activeIndex
                  ? "opacity-100 translate-x-0 rotate-0 scale-100"
                  : "opacity-0 translate-x-8 rotate-2 scale-95"
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br to-white`} />
              <img
                src={`http://127.0.0.1:8000${category.img_url}`}
                alt={category.name}
                className="w-full h-full object-cover mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-white text-3xl font-bold mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-6">{category.desctiption}</p>
                <Button
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20"
                >
                  Explore Collection
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
