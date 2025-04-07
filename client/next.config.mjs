/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
    ],
    domains: ["source.unsplash.com", "placeimg.com", "picsum.photos"],
  },
};

export default nextConfig;
