"use client";
import React, { useState } from "react";
import Image from "next/image";

const ProductDetails = ({ product }) => {
  const [featureImage, setFeatureImage] = useState(0);

  const attributes = product.product_variants.reduce((acc, variant) => {
    variant.attribute_values.forEach(
      ({ product_attribute, attribute_value }) => {
        if (!acc[product_attribute]) {
          acc[product_attribute] = new Set();
        }
        acc[product_attribute].add(attribute_value);
      }
    );

    return acc;
  }, {});

  const newarr = Object.entries(attributes);

  const newarr2 = newarr.map((element, index) => {
    element[1] = [...element[1]];
  });

  console.log("result is ", newarr2);

  if (!product) {
    return (
      <div className="flex flex-col px-20">
        <div className="flex flex-col">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full bg-gray-400 px-28 pt-12 gap-10">
        <div className="flex flex-row gap-6">
          <div
            className={`grid grid-flow-row ${
              product.product_media.length === 4
                ? "content-between"
                : "content-start gap-6"
            }`}
          >
            {product.product_media.map((prod, i) =>
              i !== featureImage ? (
                <div
                  key={i}
                  onClick={() => setFeatureImage(i)}
                  className=" image-thumbnail group cursor-pointer"
                >
                  <Image
                    src={`http://127.0.0.1:8000${prod.img_url}`}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : null
            )}
          </div>
          <div className="image-main group cursor-pointer">
            <Image
              src={`http://127.0.0.1:8000${product.product_media[featureImage].img_url}`}
              alt="product"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col bg-amber-300 p-4">
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-yellow-500">*****</p>
          <h2 className="text-lg font-semibold">$ {product.regular_price}</h2>
          <p className="text-sm">{product.description}</p>

          <h3 className="mt-4">Attributes</h3>
          <div className="flex flex-col gap-x-2">
            {newarr.flat().map((element, i) => (
              <>
                <div className="flex flex-row">{element[i]}</div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
