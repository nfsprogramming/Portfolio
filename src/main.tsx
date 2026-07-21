import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/new-sections.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </StrictMode>
);
