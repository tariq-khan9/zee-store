import LandingPage from "@/components/pages/Landing";
import NewArrival from "@/components/landing/Brands";

import Testimonials from "@/components/landing/Testimonials";
import Newsletter from "@/components/landing/Newsletter";
import Collections from "@/components/landing/Collections";
import Brands from "@/components/landing/Brands";
import BestSelling from "@/components/landing/BestSelling";
import NewArrivals from "@/components/landing/NewArrivals";
import {
  getData,
  getBrand,
  getCollection,
  getStock,
  getTestimonial,
} from "@/lib/api";

async function Home() {
  const allProducts = await getData();
  const stocks = await getStock();
  const testimonials = await getTestimonial();
  console.log("testimonial ", testimonials);
  const newArrivals = allProducts
    .sort((a, b) => b.created_at - a.created_at)
    .slice(0, 8);

  const sortedStock = stocks
    .sort((a, b) => {
      return b.units_sold - a.units_sold;
    })
    .map((product) => {
      return {
        product_variant: product.product_variant,
        units_sold: product.units_sold,
      };
    });

  const topSoldProducts = allProducts
    .map((product) => {
      const totalSold = product.product_variants.reduce((sum, variant) => {
        return sum + (variant.variant_stock?.units_sold || 0);
      }, 0);

      return {
        ...product,
        product_sold: totalSold,
      };
    })
    .sort((a, b) => b.product_sold - a.product_sold)
    .slice(0, 6);

  const collections = await getCollection();
  const brands = await getBrand();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <div className="px-20 mt-20  dark:bg-black">
        <Collections collections={collections} />
        <div className="mt-20">
          <NewArrivals products={allProducts} />
        </div>

        <div className="mt-20">
          <Brands brands={brands} />
        </div>

        <div className="mt-20">
          <BestSelling topSoldProducts={topSoldProducts} />
        </div>

        <div>
          <Testimonials testimonials={testimonials} />
        </div>
      </div>
      <div className="px-0 w-full">
        <Newsletter />
      </div>
    </div>
  );
}

export default Home;
