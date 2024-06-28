/** @type {import('next').NextConfig} */

const { ENV_PLATFORM, FRONTEND_ADDR } = process.env;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
    NEXT_PUBLIC_FRONTEND_ADDR: FRONTEND_ADDR,
  },
};

export default nextConfig;
