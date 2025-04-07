import LandingPage from "@/components/pages/Landing";
import NewArrival from "@/components/landing/Brands";

import BestSelling from "@/components/landing/BestSelling";
import NewArrivals from "@/components/landing/NewArrivals";
import Testimonials from "@/components/landing/Testimonials";
import Newsletter from "@/components/landing/Newsletter";
import Collections from "@/components/landing/Collections";

async function getData() {
  const res = await fetch("http://localhost:8000/api/");

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

async function getCollection() {
  const res = await fetch("http://localhost:8000/api/collection");

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    throw new Error("Failed to fetch data");
  }

  return res.json(); // only if response is ok
}

async function Home() {
  const newArrivals = await getData();
  const collections = await getCollection();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-20 bg-gray-50">
        <Collections collections={collections} />
        <div className="mt-20">
          <h1>New Arrivals</h1>
          <NewArrivals newArrivals={newArrivals} />
        </div>

        <div className="mt-20">
          <h1>Brands</h1>
          {/* <NewArrival newArrivals={newArrivals} /> */}
        </div>

        <div className="mt-20">
          <h1>Category Products</h1>
          <BestSelling products={newArrivals} />
        </div>

        <div>
          <Testimonials />
        </div>

        <div>
          <Newsletter />
        </div>
      </div>
    </div>
  );
}

export default Home;
