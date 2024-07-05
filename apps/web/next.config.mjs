/** @type {import('next').NextConfig} */

import { withSentryConfig } from '@sentry/nextjs';
const {
  ENV_JWT_KEY,
  ENV_PLATFORM,
  ADMIN_API_ADDR,
  PRODUCT_API_ADDR,
  RECOMMEND_API_ADDR,
  FRONTEND_ADDR,
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
  OTEL_TRACES_SAMPLER,
  OTEL_TRACES_SAMPLER_ARG,
  OTEL_NODE_DISABLED_INSTRUMENTATIONS,
} = process.env;

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ['@repo/ui'],
  env: {
    ENV_JWT_KEY,
    ADMIN_API_ADDR,
    PRODUCT_API_ADDR,
    RECOMMEND_API_ADDR,
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    OTEL_TRACES_SAMPLER,
    OTEL_TRACES_SAMPLER_ARG,
    OTEL_NODE_DISABLED_INSTRUMENTATIONS,
    NEXT_PUBLIC_PLATFORM: ENV_PLATFORM,
    NEXT_PUBLIC_FRONTEND_ADDR: FRONTEND_ADDR,
  },
};

export default withSentryConfig(nextConfig, {
  org: 'netmarble-monitoring-service',
  project: 'frontend-observability-demo',
  // An auth token is required for uploading source maps.
  // authToken: process.env.SENTRY_AUTH_TOKEN,
});
