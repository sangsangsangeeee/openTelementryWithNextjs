export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.info("register openTelementry");
    await import("./instrumentation.node");
  } else {
    console.info("edge 환경임");
  }
}
