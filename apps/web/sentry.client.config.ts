import * as Sentry from '@sentry/nextjs';
import pjson from './package.json';

Sentry.init({
  dsn: 'https://b9f73bba2fdc56b63eb7cae1f416c6f4@o720447.ingest.us.sentry.io/4507524771414016',
  release: `web@${pjson.version}`,
  environment: 'local',
  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserProfilingIntegration(),
  ],
  tracesSampleRate: 1,
  profilesSampleRate: 1, // final profiling: tracesSampleRate * profilesSampleRate
  replaysSessionSampleRate: 1,
  replaysOnErrorSampleRate: 1.0,
  enabled: true,
});
