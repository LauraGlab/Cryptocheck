import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { DarkModeProvider } from "./logic/DarkModeContext.jsx";
import { CoinProvider } from "./logic/CoinContext.jsx";
import "./css/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DarkModeProvider>
      <CoinProvider>
        <App />
      </CoinProvider>
    </DarkModeProvider>
  </StrictMode>
);
