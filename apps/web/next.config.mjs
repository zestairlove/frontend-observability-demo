/** @type {import('next').NextConfig} */

const {
  AD_SERVICE_ADDR = '',
  CART_SERVICE_ADDR = '',
  CHECKOUT_SERVICE_ADDR = '',
  CURRENCY_SERVICE_ADDR = '',
  PRODUCT_CATALOG_SERVICE_ADDR = '',
  RECOMMENDATION_SERVICE_ADDR = '',
  SHIPPING_SERVICE_ADDR = '',
  ENV_PLATFORM = '',
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
  OTEL_SERVICE_NAME = 'frontend',
  PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = '',
} = process.env;

// console.log('process.env in nextconfig', process.env);
// console.log('ENV_PLATFORM in nextconfig', ENV_PLATFORM);

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_PLATFORM: 'test',
    NEXT_PUBLIC_OTEL_SERVICE_NAME: 'frontend',
  },
};

export default nextConfig;
