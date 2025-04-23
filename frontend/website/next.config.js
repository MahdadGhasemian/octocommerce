/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  // swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.octocommerce.ir',
      },
      {
        protocol: 'https',
        hostname: 'stage-api.octocommerce.ir',
      },
      {
        protocol: 'https',
        hostname: 'www.instagram.com',
      },
      {
        protocol: 'https',
        hostname: 'twitter.com',
      },
      {
        protocol: 'https',
        hostname: 'www.linkedin.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aparat.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'www.localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap-index',
      },
    ];
  },
};

module.exports = nextConfig;
