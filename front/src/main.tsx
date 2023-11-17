import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { SelectedAssetsStorage } from "./contexts/SelectedAssetsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SelectedAssetsStorage>
      <App />
    </SelectedAssetsStorage>
  </React.StrictMode>
);
