import {
  Resource,
  browserDetector,
  detectResourcesSync,
} from "@opentelemetry/resources";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { UserInteractionInstrumentation } from "@opentelemetry/instrumentation-user-interaction";

import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";

const { NEXT_PUBLIC_OTEL_SERVICE_NAME = "frontend" } = process.env;

const frontendTracer = (collectorString: string) => {
  let resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: NEXT_PUBLIC_OTEL_SERVICE_NAME,
  });

  const detectedResources = detectResourcesSync({
    detectors: [browserDetector],
  });

  resource = resource.merge(detectedResources);

  const provider = new WebTracerProvider({ resource });

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  //   provider.addSpanProcessor(
  //     new BatchSpanProcessor(
  //       new OTLPTraceExporter({
  //         url: NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT || collectorString || 'http://localhost:4318/v1/traces',
  //       }),
  //       {
  //         scheduledDelayMillis: 500,
  //       }
  //     )
  //   );

  const contextManager = new ZoneContextManager();

  provider.register({
    contextManager,
    propagator: new CompositePropagator({
      propagators: [
        new W3CBaggagePropagator(),
        new W3CTraceContextPropagator(),
      ],
    }),
  });

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      getWebAutoInstrumentations({
        "@opentelemetry/instrumentation-fetch": {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
          applyCustomAttributesOnSpan(span) {
            span.setAttribute("app.synthetic_request", "synthetic_request");
          },
        },
      }),
      new UserInteractionInstrumentation({
        eventNames: ["click", "submit", "change"],
        shouldPreventSpanCreation: (_, element, span) => {
          span.setAttribute("target.id", element.id);
          span.setAttribute("target.text", element.textContent || "");
          span.setAttribute("target.className", element.className || "");

          return false;
        },
      }),
    ],
  });
};

export default frontendTracer;
