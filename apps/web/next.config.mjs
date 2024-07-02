/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs';
const { ENV_PLATFORM, FRONTEND_ADDR } = process.env;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@repo/ui'],
  env: {
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
    NEXT_PUBLIC_FRONTEND_ADDR: FRONTEND_ADDR,
  },
};

export default withSentryConfig(nextConfig, {
  org: 'netmarble-monitoring-service',
  project: 'frontend-observability-demo',
  // // An auth token is required for uploading source maps.
  // authToken: process.env.SENTRY_AUTH_TOKEN,
});
