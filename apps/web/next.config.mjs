/** @type {import('next').NextConfig} */

const { ENV_PLATFORM = '' } = process.env;

// console.log('process.env in nextconfig', process.env);
// console.log('ENV_PLATFORM in nextconfig', ENV_PLATFORM);

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
  },
};

export default nextConfig;
