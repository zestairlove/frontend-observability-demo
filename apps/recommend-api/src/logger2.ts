import * as api from '@opentelemetry/api';

export const logger2 = (msg: string) => console.log(`[logger2] ${msg}`);

// export const logger2 = (msg: string) => {
//   // Get a current span.
//   let current_span = api.trace.getSpan(api.context.active());

//   // Obtain trace_id, span_id and trace flag
//   let trace_id = current_span?.spanContext().traceId;
//   let span_id = current_span?.spanContext().spanId;
//   let trace_flags = current_span?.spanContext().traceFlags;
//   console.log(
//     `[logger2] ${msg} trace_id:”${trace_id}” span_id:”${span_id}” trace_flags:”${trace_flags}”`
//   );
// };
