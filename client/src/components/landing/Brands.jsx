"use client";
import Image from "next/image";
import Link from "next/link";

export default function Brands({ brands }) {
  if (!brands || !Array.isArray(brands)) {
    return <div>No brands data available</div>;
  }

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {brands.map((item, index) => (
          <Link
            href={`/list?cat=${item.name}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item.id || index}
          >
            <div className="relative bg-white border border-gray-200 px-4 w-full h-96">
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_SERVER_URL}${item.img_url}` ||
                  "/images/default.jpg"
                }
                alt={item.name}
                fill
                sizes="18vw"
                className="object-contain"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide">
              {item.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}
