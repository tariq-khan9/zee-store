import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const sampleProducts = [
  {
    _id: "1",
    slug: "product-1",
    name: "Sample Product 1",
    price: { price: 49.99 },
    media: {
      mainMedia: { image: { url: "/product1.png" } },
      items: [{ image: { url: "https://picsum.photos/200/300" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 1.",
      },
    ],
  },
  {
    _id: "2",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "/product2.png" } },
      items: [{ image: { url: "https://picsum.photos/200/300" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
  {
    _id: "3",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "https://picsum.photos/200/300" } },
      items: [{ image: { url: "/product2-alt.png" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
  {
    _id: "4",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "https://picsum.photos/200/300" } },
      items: [{ image: { url: "/product2-alt.png" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
  {
    _id: "2",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "/product2.png" } },
      items: [{ image: { url: "https://picsum.photos/200/300" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
  {
    _id: "3",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "https://picsum.photos/200/300" } },
      items: [{ image: { url: "/product2-alt.png" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
  {
    _id: "4",
    slug: "product-2",
    name: "Sample Product 2",
    price: { price: 79.99 },
    media: {
      mainMedia: { image: { url: "https://picsum.photos/200/300" } },
      items: [{ image: { url: "/product2-alt.png" } }],
    },
    additionalInfoSections: [
      {
        title: "shortDesc",
        description: "This is a short description of Product 2.",
      },
    ],
  },
];

const ProductList = ({ categoryId, limit, searchParams }) => {
  const filteredProducts = sampleProducts.slice(0, limit || PRODUCT_PER_PAGE);

  return (
    <div className="mt-4  flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {filteredProducts.map((product) => (
        <Link
          href={`/${product.slug}`}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[0]?.image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className=" ring-1 ring-lama text-lama w-max py-2 px-4 text-xs  ">
            Add to Cart
          </button>
        </Link>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination currentPage={0} hasPrev={false} hasNext={false} />
      ) : null}
    </div>
  );
};

export default ProductList;
