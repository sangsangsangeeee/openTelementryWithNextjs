import "@/styles/globals.css";
import { getCookie } from "cookies-next";
import FrontendTracer from "@/utils/openTelemetry/tracer";
import type { AppProps } from "next/app";

declare global {
  interface Window {
    ENV: {
      NEXT_PUBLIC_PLATFORM?: string;
      NEXT_PUBLIC_OTEL_SERVICE_NAME?: string;
      NEXT_PUBLIC_OTEL_EXPORTER_OTLP_TRACES_ENDPOINT?: string;
      IS_SYNTHETIC_REQUEST?: string;
    };
  }
}

if (typeof window !== "undefined") {
  const collector = getCookie("otelCollectorUrl")?.toString() || "";

  FrontendTracer(collector);
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
