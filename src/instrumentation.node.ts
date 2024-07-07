import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import {
  Resource,
  envDetector,
  hostDetector,
  osDetector,
  processDetector,
} from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { ConsoleSpanExporter } from "@opentelemetry/sdk-trace-node";
import { diag, DiagConsoleLogger, DiagLogLevel } from "@opentelemetry/api";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-grpc";

import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
new ConsoleSpanExporter();

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "my-service",
  }),
  traceExporter: new OTLPTraceExporter({
    url: "http://grafana-tempo:4317",
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      // only instrument fs if it is part of another trace
      "@opentelemetry/instrumentation-fs": {
        requireParentSpan: true,
      },
    }),
  ],
  // metricReader: new PeriodicExportingMetricReader({
  //   exporter: new OTLPMetricExporter({
  //     url: "http://grafana-tempo:4317",
  //   }),
  // }),
  resourceDetectors: [envDetector, hostDetector, osDetector, processDetector],

  // resource: new Resource({
  //   [SEMRESATTRS_SERVICE_NAME]: "next-app",
  // }),
  // traceExporter: new OTLPTraceExporter({
  //   url: "http://grafana-tempo:4317",
  // }),
  // instrumentations: [getNodeAutoInstrumentations()],
  // resourceDetectors: [],
});

sdk.start();
