import * as Sentry from '@sentry/nextjs';
import pjson from './package.json';

Sentry.init({
  dsn: 'https://6a27145bec97471aef00d47d396c196b@o991552.ingest.us.sentry.io/4507527195197440',
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
