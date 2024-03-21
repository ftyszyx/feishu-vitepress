import {
  Apollo,
  BROWSER_TRACING_INTEGRATION_ID,
  BrowserTracing,
  Express,
  GraphQL,
  IdleTransaction,
  Mongo,
  Mysql,
  Postgres,
  Prisma,
  Span,
  SpanStatus,
  TRACEPARENT_REGEXP,
  Transaction,
  addExtensionMethods,
  defaultRequestInstrumentationOptions,
  extractTraceparentData,
  getActiveTransaction,
  hasTracingEnabled,
  instrumentOutgoingRequests,
  spanStatusfromHttpCode,
  startIdleTransaction,
  stripUrlQueryAndFragment
} from "./chunk-DQEOCLYA.js";
import "./chunk-CSAU5B4Q.js";

// node_modules/@sentry/tracing/esm/index.js
var BrowserTracing2 = BrowserTracing;
var addExtensionMethods2 = addExtensionMethods;
var getActiveTransaction2 = getActiveTransaction;
var extractTraceparentData2 = extractTraceparentData;
var spanStatusfromHttpCode2 = spanStatusfromHttpCode;
var Transaction2 = Transaction;
var Span2 = Span;
var BROWSER_TRACING_INTEGRATION_ID2 = BROWSER_TRACING_INTEGRATION_ID;
var defaultRequestInstrumentationOptions2 = defaultRequestInstrumentationOptions;
var hasTracingEnabled2 = hasTracingEnabled;
var stripUrlQueryAndFragment2 = stripUrlQueryAndFragment;
var TRACEPARENT_REGEXP2 = TRACEPARENT_REGEXP;
var IdleTransaction2 = IdleTransaction;
var instrumentOutgoingRequests2 = instrumentOutgoingRequests;
var startIdleTransaction2 = startIdleTransaction;
var SpanStatus2 = SpanStatus;
var Integrations = {
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `BrowserTracing` can be imported from `@sentry/browser` or your framework SDK
   *
   * import { BrowserTracing } from '@sentry/browser';
   * new BrowserTracing()
   */
  // eslint-disable-next-line deprecation/deprecation
  BrowserTracing: BrowserTracing2,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Apollo` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Apollo({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Apollo,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Express` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Express({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Express,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `GraphQL` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.GraphQL({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  GraphQL,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Mongo` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Mongo({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Mongo,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Mysql` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Mysql({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Mysql,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Postgres` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Postgres({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Postgres,
  /**
   * @deprecated `@sentry/tracing` has been deprecated and will be moved to to `@sentry/node`, `@sentry/browser`, or your framework SDK in the next major version.
   * `Prisma` can be imported from `@sentry/node`
   *
   * import { Integrations } from '@sentry/node';
   * new Integrations.Prisma({ ... })
   */
  // eslint-disable-next-line deprecation/deprecation
  Prisma
};
if (typeof __SENTRY_TRACING__ === "undefined" || __SENTRY_TRACING__) {
  addExtensionMethods();
}
export {
  BROWSER_TRACING_INTEGRATION_ID2 as BROWSER_TRACING_INTEGRATION_ID,
  BrowserTracing2 as BrowserTracing,
  IdleTransaction2 as IdleTransaction,
  Integrations,
  Span2 as Span,
  SpanStatus2 as SpanStatus,
  TRACEPARENT_REGEXP2 as TRACEPARENT_REGEXP,
  Transaction2 as Transaction,
  addExtensionMethods2 as addExtensionMethods,
  defaultRequestInstrumentationOptions2 as defaultRequestInstrumentationOptions,
  extractTraceparentData2 as extractTraceparentData,
  getActiveTransaction2 as getActiveTransaction,
  hasTracingEnabled2 as hasTracingEnabled,
  instrumentOutgoingRequests2 as instrumentOutgoingRequests,
  spanStatusfromHttpCode2 as spanStatusfromHttpCode,
  startIdleTransaction2 as startIdleTransaction,
  stripUrlQueryAndFragment2 as stripUrlQueryAndFragment
};
//# sourceMappingURL=@sentry_tracing.js.map
