import Image from "next/image";
import Link from "next/link";

export default function Brands({ newArrivals }) {
  console.log("data in arrival ", newArrivals);
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {newArrivals.map((item) => (
          <Link
            href={`/list?cat=${item.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={item._id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={
                  `http://127.0.0.1:8000${item.product_media[0].img_url}` ||
                  "/images/default.jpg"
                }
                alt={item.name}
                fill
                sizes="20vw"
                className="object-cover"
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
