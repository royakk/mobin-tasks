import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      locale={faIR}
      theme={{
        token: {
          fontFamily: "Vazir, sans-serif",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
