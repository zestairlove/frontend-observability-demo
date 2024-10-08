const opentelemetry = require('@opentelemetry/sdk-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { Resource } = require('@opentelemetry/resources');
const {
  SEMRESATTRS_SERVICE_NAME,
} = require('@opentelemetry/semantic-conventions');

// const {
//   OTLPTraceExporter,
// } = require('@opentelemetry/exporter-trace-otlp-http');
const {
  OTLPTraceExporter,
} = require('@opentelemetry/exporter-trace-otlp-grpc');

const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');

// process.env.NEXT_RUNTIME = nodejs | edge
if (process.env.NEXT_RUNTIME === 'nodejs') {
  // - Otel
  diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

  // 메타데이터 설정
  const {
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
    // OTEL_EXPORTER_OTLP_TRACES_HEADERS_APIKEY,
  } = process.env;

  const resource = Resource.default().merge(
    new Resource({
      [SEMRESATTRS_SERVICE_NAME]: 'web',
      ['labels.serverGroup']: 'web',
      ['labels.zone']: 'dev',
    })
  );

  // Expoter 설정
  const otelExporter = new OTLPTraceExporter({
    url: OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || 'http://localhost:4317',
    // headers: {
    //   apiKey: OTEL_EXPORTER_OTLP_TRACES_HEADERS_APIKEY,
    // },
  });

  // otelSDK 설정
  const otelSDK = new opentelemetry.NodeSDK({
    resource,
    traceExporter: otelExporter,
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': {
          enabled: false,
        },
      }),
    ],
  });

  try {
    otelSDK.start();
    console.log('Tracing initialized');
  } catch (error) {
    console.log('Error initializing tracing', error);
  }

  process.on('SIGTERM', () => {
    otelSDK
      .shutdown()
      .then(() => console.log('Tracing terminated'))
      .catch(error => console.log('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });
}
