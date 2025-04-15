"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    avatar: "/images/user1.jpg",
    name: "John Doe",
    rating: 5,
    text: "This service is fantastic! Highly recommended.",
  },
  {
    avatar: "/images/user2.jpg",
    name: "Jane Smith",
    rating: 4,
    text: "Great experience overall. Would use again.",
  },
  {
    avatar: "/images/user3.jpg",
    name: "Sam Wilson",
    rating: 5,
    text: "Absolutely loved it. Excellent customer service.",
  },
];

const Testimonials = ({ className }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const interval = useRef(null);

  const nextTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (animating) return;
    setAnimating(true);
    setCurrentIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setTimeout(() => setAnimating(false), 500);
  };

  useEffect(() => {
    interval.current = window.setInterval(nextTestimonial, 5000);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, []);

  return (
    <section className={`py-16 lg:py-20 bg-gray-50 dark:bg-black ${className}`}>
      <div className="container relative">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Client Testimonial</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className={`transition-opacity duration-500 ${
              animating ? "opacity-0" : "opacity-100"
            }`}
          >
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-background">
                      <img
                        src={testimonials[currentIdx].avatar}
                        alt={testimonials[currentIdx].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[currentIdx].rating
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-lg italic">
                      "{testimonials[currentIdx].text}"
                    </p>
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[currentIdx].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Verified Customer
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button
            size="icon"
            variant="outline"
            className="absolute bg-gray-50 dark:bg-gray-800 left-0 top-1/2 -translate-y-1/2 rounded-full"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="absolute bg-gray-50 dark:bg-gray-800 right-0 top-1/2 -translate-y-1/2 rounded-full"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4 " />
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all ${
                currentIdx === idx ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
              onClick={() => {
                if (animating) return;
                setAnimating(true);
                setCurrentIdx(idx);
                setTimeout(() => setAnimating(false), 500);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
