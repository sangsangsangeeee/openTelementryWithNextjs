import { Context } from "@opentelemetry/api";
import {
  ReadableSpan,
  Span,
  SpanProcessor,
} from "@opentelemetry/sdk-trace-web";
import SessionGateway from "./session";

export enum AttributeNames {
  SESSION_ID = "session.id",
}

const { userId } = SessionGateway.getSession();

export class SessionIdProcessor implements SpanProcessor {
  forceFlush(): Promise<void> {
    return Promise.resolve();
  }

  onStart(span: Span, parentContext: Context): void {
    span.setAttribute(AttributeNames.SESSION_ID, userId);
  }

  onEnd(span: ReadableSpan): void {}

  shutdown(): Promise<void> {
    return Promise.resolve();
  }
}
