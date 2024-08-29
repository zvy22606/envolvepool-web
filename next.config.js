/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

const withAntdLess = require('next-plugin-antd-less');
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  return withAntdLess({
    reactStrictMode: false,
    // 配置环境变量
    env: {
      BACKEND_BASE_URL: process.env.BACKEND_BASE_URL || 'https://api.envolvepool.com/v1',
      IDE_URL: process.env.IDE_URL || 'http://localhost:8080',
      RUNTIME_ENV: process.env.RUNTIME_ENV || 'dev'
    },
    assetPrefix:
      isDev || !process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA ? '' : process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA,
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**'
        }
      ],
      minimumCacheTTL: 60
    },
    // async redirects() {
    //   return [
    //     {
    //       source: '/:lang(welcome|zh|en)/welcome',
    //       destination: '/',
    //       permanent: true
    //     }
    //   ];
    // },
    output: 'standalone'
  });
};

module.exports = nextConfig;
