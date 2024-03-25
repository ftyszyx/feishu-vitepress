import * as Sentry from "@sentry/vue";
import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./components/Layout.vue";
import "./css/style.css";
// import "./css/code.css";
// import "./css/my_style.css";
import { customConfigProvider } from "./configProvider";
export default {
  extends: DefaultTheme,
  Layout: customConfigProvider(Layout),
} as Theme;
