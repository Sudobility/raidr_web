import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { configureTheme } from "@sudobility/design";
import { generateThemeCSS, radiographTheme } from "@sudobility/design/themes";
import { SEOHead, SEOHeadProvider } from "@sudobility/seo_lib";
import { seoHeadConfig } from "./seoHead";
import App from "./App";
import "./i18n";
import "./index.css";

/* The palette, radii, border width and both font stacks live in the theme. The
   style tag is appended after index.css so the theme's base body rule wins. */
configureTheme(radiographTheme);
if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.id = "raidr-design-theme";
  styleEl.textContent = generateThemeCSS(radiographTheme);
  document.head.appendChild(styleEl);
}

const container = document.getElementById("root");
if (!container) throw new Error("#root not found");

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <SEOHeadProvider config={seoHeadConfig}>
        <SEOHead
          title={seoHeadConfig.appName}
          description={seoHeadConfig.appName}
        />
        <App />
      </SEOHeadProvider>
    </BrowserRouter>
  </StrictMode>,
);
