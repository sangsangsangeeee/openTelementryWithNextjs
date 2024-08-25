import "@/styles/globals.css";
import { getCookie } from "cookies-next";
import frontendTracer from "@/utils/telemetry/frontendTracer";
import type { AppProps } from "next/app";
import Head from "next/head";

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

  frontendTracer(collector);
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>hello world</title>
        <meta content={"hello world"} name="description" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
