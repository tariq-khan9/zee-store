"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShoppingCart, Moon, Sun } from "lucide-react";
import Image from "next/image";
import ProductList from "../landing/ProductList";
import Testimonials from "../landing/Testimonials";
import Newsletter from "../landing/Newsletter";

import Categories from "../landing/Collections";
import ProductCarousel from "../landing/BestSelling";
import BestSelling from "../landing/NewArrivals";
import NewArrival from "../landing/Brands";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="px-20 bg-gray-50">
      {/* <Categories /> */}
      <div className="mt-20">
        <h1>New Products</h1>
        {/* <ProductCarousel /> */}
      </div>

      <div className="mt-20">
        <h1>Category Products</h1>
        <NewArrival />
      </div>

      <div className="mt-20">
        <h1>Category Products</h1>
        {/* <BestSelling /> */}
      </div>

      <div>{/* <Testimonials /> */}</div>

      <div>{/* <Newsletter /> */}</div>
    </div>
  );
}
