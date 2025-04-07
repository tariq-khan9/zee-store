import Image from "next/image";
import React from "react";
import Link from "next/link";

async function getProducts() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/");
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array or handle error appropriately.
  }
}

export default async function LatestCollection() {
  const products = await getProducts();



  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col px-20">
        <div>Latest Collection!</div>
        <div className="flex flex-col">
          <p>{products.length === 0 ? "No products found." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-20">
      <div className="flex justify-center text-[18px] my-4">
        --- Latest Collection!
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-y-4">
        {products.map((prod) => (
          <div key={prod.id}>
            <Link href={`http://127.0.0.1:3000/product/${prod.slug}`}>
              <div className="image-list group cursor-pointer">
                <Image
                  src={`http://127.0.0.1:8000${prod.product_media[0].img_url}`}
                  alt="this"
                  fill
                  className="image-transition"
                />
              </div>
            </Link>
            <div>
              <h2 className="prod-label">{prod.name}</h2>
              <h3 className="prod-price">$ {prod.regular_price}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
