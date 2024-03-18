import * as Sentry from "@sentry/vue";
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";
import "./style.css";
import ArticleComment from "./components/ArticleComment.vue";
import TweetCard from "./components/TweetCard.vue";
import { customConfigProvider } from "./configProvider";
export default {
  extends: DefaultTheme,
  Layout: customConfigProvider(Layout),
  enhanceApp({ app }) {
    Sentry.init({
      app: app,
      dsn: "https://77eccf00061a83815e2289b3ed03aee0@o4506931253411840.ingest.us.sentry.io/4506931254788096",
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, //  Capture 100% of the transactions
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });

    app.component("ArticleComment", ArticleComment);
    app.component("TweetCard", TweetCard);
  },
} as Theme;
