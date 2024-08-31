/** @type {import('next').NextConfig} */

const nextConfig = {
  //reactStrictMode: true,
  async headers() {
    return [
      {
        //https://avatarfiles.alphacoders.com/305/305582.jpg
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          // {
          //   key: 'Cache-Control',
          //   value:
          //     'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          // }
        ],
      },
    ];
  },
  images: {
    // loader: "akamai",
    // path: "",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // images: {
  //   domains: [
  //     "localhost:3000",
  //     "localhost:3001",
  //     "loremflickr.com",
  //     "avatarfiles.alphacoders.com",
  //     "images.pexels.com",
  //   ],
  // },
};
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ["localhost:3000", "localhost:3001", "loremflickr.com"],
//   },
// };
module.exports = nextConfig;
