import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/global.css";
import { SelectedAssetsStorage } from "./contexts/SelectedAssetsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SelectedAssetsStorage>
    <App />
  </SelectedAssetsStorage>
);
