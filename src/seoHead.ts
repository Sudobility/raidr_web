import { type SEOHeadConfig } from "@sudobility/seo_lib";
import { supportedLanguages } from "./i18n";

const APP_NAME = (import.meta.env.VITE_APP_NAME as string) || "raidr";
const APP_DOMAIN = (import.meta.env.VITE_APP_DOMAIN as string) || "localhost";

export const seoHeadConfig: SEOHeadConfig = {
  appName: APP_NAME,
  baseUrl: `https://${APP_DOMAIN}`,
  defaultOgImage: `https://${APP_DOMAIN}/logo.png`,
  supportedLanguages,
  defaultLanguage: "en",
  applicationCategory: "BusinessApplication",
};
