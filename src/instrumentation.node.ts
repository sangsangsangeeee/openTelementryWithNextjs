import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import {
  SamplingDecision,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "next-app",
  }),
  traceExporter: new OTLPTraceExporter({
    url: "http://grafana-tempo:4317",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
  sampler: {
    shouldSample(context, traceId, spanName, spanKind, attributes, links) {
      console.info(context, traceId, spanName, spanKind, attributes, links);
      return { decision: SamplingDecision.NOT_RECORD };
    },
  },
});

sdk.start();
