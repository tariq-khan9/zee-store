import React from "react";
import Head from "next/head";
import Image from "next/image";
import ProductDetails from "@/components/pages/ProductDetails";

async function productDetail(slug) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Delay for 3 seconds
    const res = await fetch(`http://127.0.0.1:8000/api/${slug}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
  // try {
  //   const res = await fetch(`http://127.0.0.1:8000/api/${slug}`);
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! status: ${res.status}`);
  //   }
  //   const data = await res.json();

  //   return data;
  // } catch (error) {
  //   return null; // Return an empty array or handle error appropriately.
  // }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await productDetail(slug);

  if (!product) {
    return (
      <div className="flex flex-col px-20">
        <div className="flex flex-col">
          <p>{!product ? "No products found." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <ProductDetails product={product} />
    </>
  );
}
